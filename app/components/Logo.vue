<template>
  <div>
    <img
      :src="imgUrl"
      :height="height"
    >
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    imgUrl: {
      type: String,
      default: '/logo.svg'
    },
    height: {
      type: Number,
      default: 150
    }
  }
}
</script>

<style>
</style>
