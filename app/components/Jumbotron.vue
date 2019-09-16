<template>
  <div :class="b({ rounded: true, shadow: true })">
    <slot />
  </div>
</template>

<script>

const ROUNDED = 'rounded'
const SHADOW = 'shadow'

export default {
  name: 'Jumbotron',
  props: {
    [ROUNDED]: {
      type: String,
      default: ROUNDED
    },
    [SHADOW]: {
      type: String,
      default: SHADOW
    }
  }
}
</script>

<style lang="scss">
.Jumbotron {
  background: $background-gradient;
  padding: 4rem 2rem;

  &_rounded {
    border-radius: .3rem
  }

  &_shadow {
    @include box-shadow(0 1rem 3rem rgba(0,0,0,.175));
  }
}
</style>
