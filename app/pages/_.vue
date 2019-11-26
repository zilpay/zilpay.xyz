<template>
  <div :class="b()">
    <SimpleHeader
      :title="header.title"
      :sub-title="header.subTitle"
    />
    <div
      :class="b('separator')"
    />
    <Footer />
  </div>
</template>

<script>
import SimpleHeader from '../components/SimpleHeader'
import Footer from '../views/common/Footer'

export default {
  name: 'PageNotFound',
  components: {
    SimpleHeader,
    Footer
  },
  data () {
    return {
      header: {
        title: 'Page not found',
        subTitle: ''
      }
    }
  }
}
</script>

<style lang="scss">
.PageNotFound {
  &__separator {
    background-color: $background;
    height: calc(20vh + 97px);
  }
}
</style>
