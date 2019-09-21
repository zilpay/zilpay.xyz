<template>
  <div>
    <img
      src="/icons/arrow-back-button.svg"
      :class="b()"
      :height="height"
    >
  </div>
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    height: {
      type: Number,
      default: 45
    }
  }
}
</script>

<style lang="scss">
.BackButton {
  cursor: pointer;
}
</style>
