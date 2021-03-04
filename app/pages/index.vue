<template>
  <div :class="b()">
    <Header />
    <About />
    <DApps />
    <Partnerships />
    <Team />
    <Footer />
  </div>
</template>

<script>
import Header from '@/views/home/Header'
import About from '@/views/home/About'
import DApps from '@/views/home/DApps'
import Team from '@/views/home/Team'
import Partnerships from '@/views/common/Partnerships'
import Footer from '@/views/common/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    About,
    DApps,
    Footer,
    Team,
    Partnerships
  }
}
</script>

<style lang="scss">

</style>
