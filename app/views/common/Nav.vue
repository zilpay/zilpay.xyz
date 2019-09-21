<template>
  <nav :class="b({ isback: isBackButton })">
    <BackButton
      v-show="!isBackButton"
      :class="b('back-button')"
      @click.native="backHistroyRoute"
    />
    <div
      :class="b('links', { isOpen })"
      @click="isOpen = false"
    >
      <div
        v-for="link of links"
        :key="link.uuidv4"
        :class="b('nuxt-link')"
      >
        <nuxt-link
          v-if="!link.external"
          :class="b('link-item')"
          :to="`/${link.href}`"
          @click.native="isOpen = false"
        >
          {{ link.name }}
        </nuxt-link>
        <a
          v-if="link.external"
          target="_blank"
          :class="b('link-item')"
          :href="link.href"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
    <BurgerMenu
      v-model="isOpen"
      :class="b('menu')"
    />
  </nav>
</template>

<script>
import BurgerMenu from '../../components/BurgerMenu'
import BackButton from '../../components/BackButton'

export default {
  name: 'Nav',
  components: {
    BurgerMenu,
    BackButton
  },
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    isBackButton () {
      return this.$route.path === '/'
    }
  },
  methods: {
    backHistroyRoute () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">

.Nav {
  display: flex;
  justify-content: space-between;

  position: fixed;
  left: 20px;
  right: 20px;
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
    padding: 20px;
  }

  &__link-item {
    color: $white;
    font-size: $lg-font;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__menu,
  &__back-button {
    z-index: 10;
  }

  &_isback {
    justify-content: flex-end;
  }
}
</style>
