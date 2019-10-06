<template>
  <div>
    <button
      :class="b({ xl, lg, sm, md, block, variant })"
      :disabled="disabled"
      @click="clickBtn"
    >
      <slot />
    </button>
  </div>
</template>

<script>
import TYPES from '../static/types.json'

export default {
  name: 'Button',
  props: {
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
    },
    variant: {
      type: String,
      default: TYPES.primary
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickBtn () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
$hover_amount: 25%;

.Button {
  cursor: pointer;

  display: inline-block;

  text-align: center;
  vertical-align: middle;

  border-radius: .25rem;
  border: none;

  font-size: $sm-font;
  font-weight: 900;
  line-height: 1.5;

  @include transition(all .15s ease);
  @include box-shadow(0 3px 3px 0 rgba(0, 0, 0, .1));

  color: $background;

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

  &_variant-primary {
    background-color: $primary;
    border-color: $primary;

    &:hover:enabled {
      background-color: darken($primary, $hover_amount);
      border-color: darken($primary, $hover_amount);
    }
  }

  &_variant-success {
    background-color: $success;
    border-color: $success;
    color: darken($background, $hover_amount);

    &:hover:enabled {
      background-color: darken($success, $hover_amount);
      border-color: darken($success, $hover_amount);
    }
  }

  &_variant-warning {
    background-color: $warning;
    border-color: $warning;

    &:hover:enabled {
      background-color: darken($warning, $hover_amount);
      border-color: darken($warning, $hover_amount);
    }
  }

  &_variant-danger {
    background-color: $danger;
    border-color: $danger;

    &:hover:enabled {
      background-color: darken($danger, $hover_amount);
      border-color: darken($danger, $hover_amount);
    }
  }

  &_variant-info {
    background-color: $info;
    border-color: $info;

    &:hover:enabled {
      background-color: darken($info, $hover_amount);
      border-color: darken($info, $hover_amount);
    }
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.2;
  }
}
</style>
