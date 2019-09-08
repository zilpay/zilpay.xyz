<template>
  <nav :class="b()">
    <Logo :class="b('logo')" />

    <div :class="b('links', { isOpen })">
      <nuxt-link
        v-for="link of links"
        :key="link"
        :class="b('nuxt-link')"
        :to="`/${link}`"
      >
        {{ link }}
      </nuxt-link>
    </div>

    <BurgerMenu
      :class="b('menu')"
      @toggle="isOpen = $event"
    />
  </nav>
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
      ],
      isOpen: false
    }
  }
}
</script>

<style lang="scss">

.Nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  // background: $background-gradient;

  &__logo {
    cursor: pointer;
    margin: 10px;
  }

  &__links {
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    z-index: 9;
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

  &__menu {
    display: none;
    z-index: 10;
  }
}

@media screen and (max-width: 1300px) {
  .Nav {
    &__menu {
      display: block;
    }

    &__links {
      height: 100vh;
      width: 100%;

      position: fixed;
      top: 0;

      flex-direction: column;
      background: $background-gradient;

      @include clip-path(circle(100px at 100% -15%));

      &_isOpen {
        @include clip-path(circle(1900px at 100% -15%));
      }
    }

    &__nuxt-link {
      font-size: 25px;
    }
  }
}
</style>
