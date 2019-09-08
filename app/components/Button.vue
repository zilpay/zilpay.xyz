<template>
  <div>
    <button :class="b()" @click="clickBtn">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
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
  padding: 1.25rem 2.5rem;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
  border-radius: .25rem;
  border: none;

  transition: all .15s ease;

  @include no-select();
  @include box-shadow(0 3px 3px 0 rgba(0, 0, 0, .1));

  background-color: $primary;
  border-color: $borderColor;
  color: $white;

  &:hover {
    background-color: $primary - 30;
    border-color: $primary - 30;
  }
}
</style>
