<template>
  <div>
    <div :class="b()">
      <img :src="src" :class="b('img-warp')">
      <div :class="b('warp')">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoundCard',
  props: {
    src: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.RoundCard {
  display: block;

  &__img-warp {
    height: 7rem;
    width: 7rem;

    background-color: #2c3e50;
    border-radius: 50%;

    @include box-shadow(0 3px 3px 0 rgba(0, 0, 0, .1));
    @include mobile {
      height: 3rem;
      width: 3rem;
    };
  }

  &__warp {
    width: 200px;
  }
}
</style>
