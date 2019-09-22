<template>
  <div>
    <button
      :class="b({ xl, lg, sm, md, block })"
      @click="clickBtn"
    >
      <slot />
    </button>
  </div>
</template>

<script>
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

  background-color: $primary;
  border-color: $borderColor;
  color: $background;

  &:hover {
    background-color: $primary - 30;
    border-color: $primary - 30;
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
</style>
