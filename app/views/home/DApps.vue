<template>
  <section :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ $options.name }}
      </h1>
      <div :class="b('row')">
        <ReduceCard
          v-for="dapp of dapps"
          :key="dapp.id"
          :src="`/dapps/${dapp.img}`"
          :class="b('card')"
          @click="cardClick(dapp)"
        >
          <h1 :class="b('card-title')">
            {{ dapp.title }}
          </h1>
          <p :class="b('card-description')">
            {{ dapp.description }}
          </p>
        </ReduceCard>
      </div>
    </div>
  </section>
</template>

<script>
import uuidv4 from 'uuidv4'

import ReduceCard from '../../components/ReduceCard'
import DAppsData from '../../static/dapps.json'

const dapps = DAppsData.map(el => ({
  ...el,
  uuidv4: uuidv4()
}))

export default {
  name: 'DApps',
  components: {
    ReduceCard
  },
  data () {
    return {
      dapps
    }
  },
  methods: {
    cardClick (dapp) {
      if (!process.client) {
        return null
      }
      const url = `/${dapp.link}`
      if (dapp.external) {
        window.location.replace(
          window.location.origin + url
        )
      }
      this.$router.push('/app' + url)
    }
  }
}
</script>

<style lang="scss">
.DApps {
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

  &__card {
    overflow: hidden;
    max-width: 530px;
    margin: auto auto 1rem;
  }

  &__card-title {
    color: $white;

    @include mobile {
      font-size: $xs-font;
    }
  }

  &__row {
    padding-top: 50px;
    max-width: 1200px;

    display: flex;
    flex-flow: row wrap;

    justify-content: space-around;

    align-items: center;
    align-self: center;
  }
}
</style>
