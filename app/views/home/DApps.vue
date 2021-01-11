<template>
  <section :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ $options.name }}
      </h1>
      <div :class="b('row')">
        <NuxtLink
          v-for="dapp of dapps"
          :key="dapp.link"
          :to="dapp.link"
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
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import ReduceCard from '@/components/ReduceCard'

const dapps = [
  {
    img: 'Signature.png',
    title: 'Signature verification',
    link: 'Verification',
    external: false,
    description: 'This application can check signature of transaction or message.'
  },
  {
    img: 'scillaeditor.png',
    title: 'scilla-editor',
    link: 'Editor',
    external: false,
    description: 'Editor and deploy smart contract on scilla language'
  },
  {
    img: 'roll_game.png',
    title: 'Roll game',
    link: 'roll',
    external: false,
    description: 'You can play with the test Zil'
  },
  {
    img: 'unstoppabledomains.png',
    title: 'Blockchain Domain Names',
    link: 'unstoppabledomains',
    external: false,
    description: 'Replace cryptocurrency addresses \nwith a human readable name'
  }
]

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
