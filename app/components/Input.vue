<template>
  <div>
    <label
      :class="b({ variant }, 'label')"
      :for="uuidv4"
    >
      {{ label }}
    </label>
    <input
      :id="uuidv4"
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
import uuidv4 from 'uuidv4'

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
      type: String || Number,
      default: null
    },
    label: {
      type: String,
      default: ''
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
  data () {
    return {
      uuidv4: uuidv4()
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
  width: 100%;

  background: transparent;

  font-size: $sm-font;
  border-width: 1px;
  text-align: center;
  border-radius: .25rem;

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
    border: 1px solid $primary;
  }

  &_variant-success {
    color: $success + 150;
    border-color: $success;
    border: 1px solid $success;
  }

  &_variant-warning {
    color: $warning + 150;
    border-color: $warning;
    border: 1px solid $warning;
  }

  &_variant-danger {
    color: $danger + 150;
    border-color: $danger;
    border: 1px solid $danger;
  }

  &_variant-info {
    color: $info + 150;
    border-color: $info;
    border: 1px solid $info;
  }
}
.label {
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  border: 0;
}
</style>
