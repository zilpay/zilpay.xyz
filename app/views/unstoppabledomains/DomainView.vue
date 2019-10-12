<template>
  <div>
    <Jumbotron :class="b()">
      <h3
        :class="b('title')"
      >
        Price:
        <span
          :class="b('title-span')"
        >
          ${{ domainPrice }}
        </span>
      </h3>
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
    </Jumbotron>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Jumbotron from '../../components/Jumbotron'
import Alert from '../../components/Alert'
import ViewBlockLink from '../../components/ViewBlockLink'

export default {
  name: 'DomainView',
  components: {
    Jumbotron,
    Alert,
    ViewBlockLink
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
      types: TYPES
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
    },
    domainPrice () {
      if (!this.info.price) {
        return 0
      }
      return Number(this.info.price) / 100
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
    text-align: left;
  }

  &__view-block-link {
    margin-left: 5px;
  }
}
</style>
