<template>
  <div :class="b()">
    <div :class="b('item')">
      <Logo :class="b('logo')" />
    </div>
    <div :class="b('item')">
      <div :class="b('links')">
        <nuxt-link
          v-for="link of links"
          :key="link"
          :class="b('nuxt-link')"
          :to="`/${link}`"
        >
          {{ link }}
        </nuxt-link>
      </div>
    </div>
    <div :class="b('item')">
      <BurgerMenu :class="b('menu')" />
    </div>
  </div>
</template>

<script>
import Logo from './Logo'
import BurgerMenu from './BurgerMenu'

export default {
  name: 'Nav',
  components: {
    Logo,
    BurgerMenu
  },
  data () {
    return {
      links: [
        'Home',
        'About',
        'Services',
        'DApps',
        'Privacy policy',
        'Terms',
        'contacts'
      ]
    }
  }
}
</script>

<style lang="scss">

.Nav {
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding-top: 40px;

  &__logo {
    cursor: pointer;
  }

  &__links {
    display: flex;
    justify-content: space-between;
  }

  &__nuxt-link {
    margin-left: 36px;
    padding: 5px 0;
    font-size: 16px;
    line-height: 22px;
    padding: 20px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    color: $white;
  }
}
</style>
