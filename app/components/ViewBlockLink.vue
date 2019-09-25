<template>
  <div>
    <a
      :href="href"
      :target="target"
      :class="b()"
    >
      <slot />
    </a>
  </div>
</template>

<script>
export default {
  name: 'ViewBlockLink',
  props: {
    network: {
      type: String,
      default: 'mainnet'
    },
    isblank: {
      type: Boolean,
      default: true
    },
    address: {
      type: String,
      default: null
    },
    hash: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      base: 'https://viewblock.io/zilliqa',
      prefixAddress: 'address',
      prefixTx: 'tx'
    }
  },
  computed: {
    href () {
      if (!this.hash && !this.address) {
        throw new Error('hash: is', this.hash, 'or address is', this.address)
      }

      if (this.hash) {
        return `${this.base}/${this.prefixTx}/${this.hash}?network=${this.network}`
      } else if (this.address) {
        return `${this.base}/${this.prefixAddress}/${this.address}?network=${this.network}`
      }

      return null
    },
    target () {
      if (this.isblank) {
        return '_blank'
      }

      return null
    }
  }
}
</script>

<style lang="scss">
.ViewBlockLink {
}
</style>
