<template>
  <div :class="b()">
    <Header />
    <About />
    <DApps />
    <Footer />
  </div>
</template>

<script>
import Header from '@/views/home/Header'
import About from '@/views/home/About'
import DApps from '@/views/home/DApps'
import Footer from '@/views/common/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    About,
    DApps,
    Footer
  }
}
</script>

<style lang="scss">

</style>
