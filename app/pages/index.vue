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
import Header from '../views/Header'
import About from '../views/About'
import Advantages from '../views/Advantages'
import DApps from '../views/DApps'
import Footer from '../views/Footer'

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
