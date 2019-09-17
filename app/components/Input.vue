<template>
  <div>
    <input
      :class="b({ variant })"
      :type="type"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :value="value"
      @input="change"
    >
  </div>
</template>

<script>
import TYPES from '../static/types.json'

export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    variant: {
      type: String,
      default: TYPES.primary
    }
  },
  methods: {
    change (event) {
      this.$emit('input', Number(event.target.value))
    }
  }
}
</script>

<style lang="scss">
.Input {
  display: block;
  padding: 0.5rem 1.6rem;
  width: 200px;

  background: transparent;

  font-size: $sm-font;
  border-width: 1px;
  text-align: center;

  @include transition(box-shadow 300ms);

  &::placeholder {
    color: $grey-darker;
  }

  &:focus {
    outline: none;
  }

  &_variant-primary {
    color: $primary + 150;
    border-color: $primary;
  }

  &_variant-success {
    color: $success + 150;
    border-color: $success;
  }

  &_variant-warning {
    color: $warning + 150;
    border-color: $warning;
  }

  &_variant-danger {
    color: $danger + 150;
    border-color: $danger;
  }

  &_variant-info {
    color: $info + 150;
    border-color: $info;
  }
}
</style>
