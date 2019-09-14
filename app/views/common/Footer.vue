<template>
  <footer :class="b()">
    <div :class="b('container')">
      <div :class="b('social-network')">
        <LinkIcon
          v-for="el of socialNetwork"
          :key="el.name"
          :img="`/icons/${el.icon}`"
          :src="el.src"
          :blanck="true"
          :class="b('social-link')"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import LinkIcon from '../../components/LinkIcon'

export default {
  name: 'Footer',
  components: {
    LinkIcon
  },
  data () {
    return {
      socialNetwork: [
        {
          name: 'Github',
          src: 'https://github.com/zilpay/zil-pay',
          icon: 'github-logo.svg'
        },
        {
          name: 'Telegram',
          src: 'https://t.me/zilpay',
          icon: 'telegram.svg'
        },
        {
          name: 'Mozilla',
          src: 'https://addons.mozilla.org/en-GB/firefox/addon/zilpay/',
          icon: 'firefox.svg'
        },
        {
          name: 'Chrome',
          src: 'https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd',
          icon: 'chrome.svg'
        },
        {
          name: 'Medium',
          src: 'https://medium.com/@lich666black',
          icon: 'medium.svg'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.Footer {
  min-height: 20vh;
  background: $background;

  &__container {
    padding: 50px 50px 0 50px;

    display: flex;
    flex-direction: column;

    text-align: center;
  }

  &__social-network {
    max-width: 900px;

    display: flex;
    align-items: center;
    flex-flow: row wrap;

    justify-content: space-around;

    align-self: center;
  }

  &__social-link {
    margin: 10px;
  }
}
</style>
