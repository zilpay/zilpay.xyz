<template>
  <section :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ $options.name }}
      </h1>
      <div :class="b('row')">
        <nuxt-link
          v-for="dapp of dapps"
          :key="dapp.id"
          :to="'/app/' + dapp.link"
        >
          <ReduceCard
            :src="`/dapps/${dapp.img}`"
            :class="b('card')"
          >
            <h1 :class="b('card-title')">
              {{ dapp.title }}
            </h1>
            <p :class="b('card-description')">
              {{ dapp.description }}
            </p>
          </ReduceCard>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { uuid } from 'uuidv4'
import ReduceCard from '@/components/ReduceCard'
import DAppsData from '@/static/dapps.json'

const dapps = DAppsData.map(el => ({
  ...el,
  uuidv4: uuid()
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
  }
}
</script>

<style lang="scss">
.DApps {
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
