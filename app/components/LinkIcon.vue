<template>
  <a
    :href="src"
    target="_blank"
  >
    <img
      :src="img"
      :height="height"
      :class="b()"
    >
  </a>
</template>

<script>
export default {
  name: 'LinkIcon',
  props: {
    src: {
      type: String,
      default: null
    },
    img: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style lang="scss">
.LinkIcon {
  cursor: pointer;
}
</style>
