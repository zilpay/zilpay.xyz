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
      <div :class="b('items')">
        <div :class="b('item')">
          <h2>
            Legal
          </h2>
          <ul :class="b('list')">
            <li>
              <nuxt-link
                :class="b('link-item')"
                :to="`/Terms`"
                @click.native="isOpen = false"
              >
                Terms of Service
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :class="b('link-item')"
                :to="`/Privacy`"
                @click.native="isOpen = false"
              >
                Privacy Policy
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div :class="b('item')">
          <h2>
            Office
          </h2>
          <p :class="b('info')">
            kv. 6, d. 9 ul. Shkolnaya
            Martyush , 623462
            Russian Federation
          </p>
        </div>
        <div :class="b('item')">
          <h2>
            Contact us
          </h2>
          <a
            href="mailto:contact@zilpay.io"
            :class="b('link-item')"
          >
            contact@zilpay.io
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import LinkIcon from '@/components/LinkIcon'

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
          name: 'GooglePlay',
          src: 'https://play.google.com/store/apps/details?id=com.zilpaymobile',
          icon: 'google-play.svg'
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
        },
        {
          name: 'Twitter',
          src: 'https://twitter.com/pay_zil',
          icon: 'twitter.svg'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.Footer {
  min-height: 25vh;
  background: $background;

  &__list > li {
    margin-top: 5px;
  }

  &__info {
    color: $white;
    max-width: 500px;
    padding: 3px;
    max-width: 200px;
    text-align: left;
  }

  &__items {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

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
