<template>
  <header :class="b()">
    <canvas id="parallax" />
    <div :class="b('content')">
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
  </header>
</template>

<script>
import fluid from '../../lib/fluid'

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
    fluid('parallax')
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__content {
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    z-index: 3;
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
    font-weight: 700;
    border-radius: 10px;
    max-width: 300px;
    text-transform: uppercase;
    color: $black;
  }
}
#parallax {
  position: absolute;
}
</style>
