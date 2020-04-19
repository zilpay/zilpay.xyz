<template>
  <section :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ $options.name }}
      </h1>
      <div :class="b('row')">
        <RoundCard
          v-for="el of elements"
          :key="el.id"
          :src="`/icons/${el.icon}`"
          :class="b('card')"
        >
          <strong :class="b('card-title')">
            {{ el.title }}
          </strong>
          <p :class="b('card-description')">
            {{ el.description }}
          </p>
        </RoundCard>
      </div>
    </div>
  </section>
</template>

<script>
import { uuid } from 'uuidv4'
import RoundCard from '@/components/RoundCard'

export default {
  name: 'Advantages',
  components: {
    RoundCard
  },
  data () {
    return {
      elements: [
        {
          id: uuid(),
          icon: 'cat-pet-kitten.svg',
          title: 'Convenience',
          description: 'Pleasant UI.'
        },
        {
          id: uuid(),
          icon: 'eletric-stove.svg',
          title: 'functionality',
          description: 'You can change any settings.'
        },
        {
          id: uuid(),
          icon: 'locked-door.svg',
          title: 'Reliability',
          description: 'Multi-layer algorithm encryption.'
        },
        {
          id: uuid(),
          icon: 'dapps.svg',
          title: 'Dapps',
          description: 'Easy dApp build.'
        },
        {
          id: uuid(),
          icon: 'hand-shake.svg',
          title: 'Zilliqa DEV Grants'
        },
        {
          id: uuid(),
          icon: 'earth-2.svg',
          title: 'Open source'
        },
        {
          id: uuid(),
          icon: 'libra.svg',
          title: 'MIT license'
        },
        {
          id: uuid(),
          icon: 'multiplatform.svg',
          title: 'Multiplatform'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.Advantages {
  background: url(/bg-2.svg) $background;

  &__container {
    min-height: 100vh;

    padding: 50px 50px 0 50px;

    display: flex;
    flex-direction: column;

    text-align: center;
  }

  &__title {
    font-size: $xl-font;
    color: $white;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__card {
    margin-top: 50px;
  }

  &__card-title {
    font-weight: bolder;
    font-size: $sm-font;
    color: $white;
  }

  &__card-description {
    color: rgba(255,255,255,.7);
    font-size: $xs-font;
  }

  &__row {
    padding-top: 50px;

    max-width: 900px;

    display: flex;
    flex-flow: row wrap;

    justify-content: space-around;

    align-items: center;
    align-self: center;
  }
}
</style>
