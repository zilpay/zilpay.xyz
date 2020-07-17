<template>
  <header :class="b()">
    <div :class="b('container')">
      <div :class="b('masthead')">
        <Logo />
        <h1 :class="b('title')">
          ZilPay Wallet
        </h1>
        <h2 :class="b('description')">
          ZilPay Browser Extension for
          <a href="https://zilliqa.com/" target="_blank">
            Zilliqa
          </a>
          blockchain
        </h2>
        <a
          :class="b('btn')"
          :href="urlsStore[detectedBrowser]"
          target="_blank"
        >
          {{ detectedBrowser }} extension
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo'
import DetectingBrowsers from '@/mixins/detecting-browsers'

export default {
  name: 'Header',
  components: {
    Logo
  },
  mixins: [DetectingBrowsers],
  data () {
    return {
      detectedBrowser: null
    }
  },
  mounted () {
    this.detectedBrowser = this.detectMixin()
  },
  methods: {
    goToStore () {
      if (process.client) {
        window.open(this.urlsStore[this.detectedBrowser])
      }
    }
  }
}
</script>

<style lang="scss">
.Header {
  background: url(/bg.svg) $background;
  background-size: cover;
  background-repeat: no-repeat;

  &__container {
    min-height: 100vh;

    padding-top: 200px;

    display: flex;
    flex-direction: column;

    text-align: center;
  }

  &__masthead {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: $xll-font;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__description {
    font-weight: 700;
    font-size: $sm-font;
  }

  &__btn {
    padding: 25px;
    background-color: $primary;
    color: $background;
    font-size: 1.5rem;
    border-radius: 10px;
    max-width: 300px;
    text-transform: uppercase;
  }
}
</style>
