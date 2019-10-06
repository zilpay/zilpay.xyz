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
      :class="b({ xl, lg, sm, md, block, variant })"
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
      type: [String, Number],
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
    },
    xl: {
      type: Boolean,
      default: false
    },
    lg: {
      type: Boolean,
      default: false
    },
    md: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uuidv4: uuidv4()
    }
  },
  methods: {
    change (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.Input {
  width: 100%;

  background: transparent;

  font-size: $sm-font;
  border-width: 1px;
  text-align: left;
  text-indent: 10px;
  border-radius: .25rem;

  border: 2px solid #dadada;
  border-radius: 7px;

  @include transition(box-shadow 300ms);

  &::placeholder {
    color: $grey-darker;
  }

  &:focus {
    outline: none;
  }

  &_variant-primary {
    color: lighten($primary, 40%);
    border-color: $primary;
    border: 1px solid $primary;
  }

  &_variant-success {
    color: lighten($success, 40%);
    border-color: $success;
    border: 1px solid $success;
  }

  &_variant-warning {
    color: lighten($warning, 40%);
    border-color: $warning;
    border: 1px solid $warning;
  }

  &_variant-danger {
    color: lighten($danger, 40%);
    border-color: $danger;
    border: 1px solid $danger;
  }

  &_variant-info {
    color: lighten($info, 40%);
    border-color: $info;
    border: 1px solid $info;
  }

  &_xl {
    padding: 1.25rem 2.5rem;
  }

  &_lg {
    padding: .5rem 1rem;
  }

  &_md {
    padding: .375rem .75rem;
  }

  &_sm {
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
  }

  &_block {
    display: block;
    width: 100%;
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
