<template>
  <span :class="b()" @click="toggle">
    <div :class="b('bar', { value })" />
    <div :class="b('bar', { value })" />
    <div :class="b('bar', { value })" />
  </span>
</template>

<script>
export default {
  name: 'BurgerMenu',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
$height: 0.3em;
$width: 3em;
$distance-between: 10px;

.BurgerMenu {
  cursor: pointer;
  transition: 0.5s ease;

  &:hover .bar {
    @include box-shadow(1px 1px 7px 1px RGBa(0, 0, 0, 0.3));
  }

  &__bar {
    width: $width;
    height: $height;
    background: $white;

    @include box-shadow(1px 1px 3px RGBa(0, 0, 0, 0.4));

    border-radius: 2px;
    transition: 0.4s ease;

    &:not(:first-child) {
      margin-top: $distance-between;
    }

    &_value {
      &:first-child {
        transform: rotate(-45deg);
        margin-top: 20px;
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        margin-top: -20px;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
