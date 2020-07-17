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
        '/img/account.png',
        '/img/accounts.png',
        '/img/connections.png'
      ]
    }
  }
}
</script>

<style lang="scss">
.About {
  background-color: $background;

  &__container {
    min-height: 100vh;

    padding: 50px 50px 0 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

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
    max-width: 1100px;
    text-align: center;

    font-size: $sm-font;
    color: lighten($grey-darker, 40%);

    @include mobile {
      font-size: $xs-font;
    }
  }

  &__preview {
    padding-top: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;

    & > img {
      max-width: 300px;
      max-height: 560px;
    }
  }

  &__img {
    border-radius: .25rem;
    margin: 20px;

    @include box-shadow(5px 10px 5px 0 rgba(0,0,0,.75));
    @include mobile {
      max-width: 200px;
    }
  }
}

</style>
