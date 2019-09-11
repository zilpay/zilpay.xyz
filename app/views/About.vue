<template>
  <section :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ $options.name }}
      </h1>
      <h2 :class="b('description')">
        Decentralized wallet, local storage of private key, physical insulation, multi-layer algorithm encryption - ensuring data security. Support free node switch and breakpoint reconnection - ensuring node stability and reliability.
      </h2>
      <div :class="b('preview')">
        <img
          v-for="img of imgs"
          :key="img"
          :class="b('img')"
          :src="img"
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  components: {
  },
  data () {
    return {
      imgs: [
        '/img/account_details.png',
        '/img/home.png',
        '/img/accounts.png'
      ]
    }
  }
}
</script>

<style lang="scss">
.About {
  background: $background-gradient;

  &__container {
    min-height: 100vh;

    padding: 50px 50px 0 50px;

    display: flex;
    flex-direction: column;

    text-align: center;
  }

  &__title {
    font-size: $xll-font;
    color: $grey-darker;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__description {
    font-size: $sm-font;
    color: $grey-darker + 100;

    @include mobile {
      font-size: $xs-font;
    }
  }

  &__preview {
    padding-top: 50px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  &__img {
    margin-top: 50px;
    border-radius: .25rem;

    @include box-shadow(10px 10px 5px 0 rgba(0,0,0,.75))
  }
}
</style>
