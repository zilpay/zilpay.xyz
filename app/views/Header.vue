<template>
  <header :class="b()">
    <div class="background" />
    <div :class="b('container')">
      <div :class="b('masthead')">
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
import Button from '../components/Button'
import DetectingBrowsers from '../mixins/detecting-browsers'

export default {
  name: 'Header',
  components: {
    Button
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
.background {
  position: absolute;
  height: 87vh;
  width: 100%;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wkICQcQyYc0PgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAUElEQVQI11WO0Q2AQAxCH+T2cgFXcP8tqF+cJ0mTUiBU1/3MzCCJ4tyXbQCScBptI4mVBGCLnZkhyWdosmINLinKe1tNVEzyq7Kk/dBpbN0LEJVA7uWBHJcAAAAASUVORK5CYII=');
  filter: blur(2px);
}
.Header {
  &__container {
    height: 80vh;

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
