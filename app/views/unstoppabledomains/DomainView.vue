<template>
  <div>
    <Jumbotron :class="b()">
      <h1
        :class="b('title')"
      >
        Resolver Information:
        <span
          :class="b('title-span')"
        >
          {{ domain }}
        </span>
      </h1>
      <h1
        :class="b('title')"
      >
        Order Total:
        <span
          :class="b('title-span')"
        >
          {{ defaultPrice }}
        </span>
      </h1>
      <Alert
        v-if="owner"
        :class="b('owner-info')"
        :variant="types.warning"
      >
        Owner:
        <ViewBlockLink
          isblank
          :address="owner"
          :class="b('view-block-link')"
        >
          {{ owner }}
        </ViewBlockLink>
      </Alert>
      <Alert
        v-for="(value, currency) of addresses"
        :key="currency"
        :class="b('addresses')"
      >
        {{ currency }}:
        {{ value }}
      </Alert>
      <Button
        md
        block
        :variant="types.warning"
        :class="b('registry-button')"
        @click="register"
      >
        Registry
      </Button>
    </Jumbotron>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Jumbotron from '../../components/Jumbotron'
import Alert from '../../components/Alert'
import ViewBlockLink from '../../components/ViewBlockLink'
import Button from '../../components/Button'

export default {
  name: 'DomainView',
  components: {
    Jumbotron,
    Alert,
    ViewBlockLink,
    Button
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    domain: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      types: TYPES,
      defaultPrice: '10$'
    }
  },
  computed: {
    owner () {
      const { owner } = this.info.meta
      if (!owner) {
        return null
      }
      return window
        .zilPay
        .crypto
        .toBech32Address(owner)
    },
    addresses () {
      return this.info.addresses || {}
    }
  },
  methods: {
    register () {
      this.$emit('register')
    }
  }
}
</script>

<style lang="scss">
.DomainView {
  text-align: left;

  &__title {
    margin-bottom: 15px;
  }

  &__title-span {
    color: $primary;
  }

  &__owner-info {
    // margin-top: 30px;
    text-align: left;
  }

  &__view-block-link {
    margin-left: 5px;
  }

  &__registry-button {
    padding: 0 30px 0;
  }
}
</style>
