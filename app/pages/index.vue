<template>
  <div :class="b()">
    <Header />
    <About />
    <Advantages />
    <DApps />
    <Footer />
  </div>
</template>

<script>
import Header from '../views/home/Header'
import About from '../views/home/About'
import Advantages from '../views/home/Advantages'
import DApps from '../views/home/DApps'
import Footer from '../views/common/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    About,
    Advantages,
    DApps,
    Footer
  }
}
</script>

<style lang="scss">

</style>
