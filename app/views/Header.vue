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
        <Button :class="b('button')" @click="goToStore">
          {{ btnTitle }} {{ detectedBrowser }}
        </Button>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '../components/Logo'
import Button from '../components/Button'
import DetectingBrowsers from '../mixins/detecting-browsers'

export default {
  name: 'Header',
  components: {
    Button,
    Logo
  },
  mixins: [DetectingBrowsers],
  data () {
    return {
      btnTitle: 'get ZilPay for',
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
  &__container {
    min-height: 100vh;

    padding-top: 200px;

    display: flex;
    flex-direction: column;

    text-align: center;
  }

  &__masthead {
    z-index: 1;
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

  &__button {
    margin-top: 30px;
  }
}

.Button {
  text-transform: uppercase;
}
</style>
