<template>
  <div>
    <img
      :src="img"
      :height="height"
      :class="b()"
      @click="goTo"
    >
  </div>
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
    },
    blanck: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goTo () {
      if (!process.client) {
        return null
      }

      if (this.blanck) {
        window.open(this.src)
      } else {
        window.location.replace(this.src)
      }
    }
  }
}
</script>

<style lang="scss">
.LinkIcon {
  cursor: pointer;
}
</style>
