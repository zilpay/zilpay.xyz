<template>
  <nav :class="b()">
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
import BurgerMenu from './BurgerMenu'

export default {
  name: 'Nav',
  components: {
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
  position: fixed;
  right: 50px;
  top: 50px;
  z-index: 9;

  &__logo {
    cursor: pointer;
    margin: 10px;
  }

  &__links {
    top: 0;
    left: 0;

    height: 100vh;
    width: 100%;

    display: flex;
    position: fixed;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $background-gradient;

    @include clip-path(circle(10px at 90% -15%));

    &_isOpen {
      @include clip-path(circle(1900px at 100% -15%));
    }
  }

  &__nuxt-link {
    margin-left: 36px;
    padding: 5px 0;
    padding: 20px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    color: $white;
    font-size: $lg-font;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__menu {
    z-index: 10;
  }
}
</style>
