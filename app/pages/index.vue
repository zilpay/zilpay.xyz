<template>
  <div :class="b()">
    <Header />
    <About />
    <DApps />
    <Partnerships />
    <Team />
    <Footer />
    <CookieConsent />
  </div>
</template>

<script>
import CookieConsent from 'vue-cookieconsent-component/src/components/CookieConsent'

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
    Partnerships,
    CookieConsent
  }
}
</script>

<style lang="scss">
// required and to get updates 
@import "./node_modules/vue-cookieconsent-component/src/scss/cookie-consent";
// example or use it 
@import "./node_modules/vue-cookieconsent-component/src/scss/cookie-consent-bottom";
@import "./node_modules/vue-cookieconsent-component/src/scss/cookie-consent-transition";

</style>
