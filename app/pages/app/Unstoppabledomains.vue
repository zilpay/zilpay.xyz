<template>
  <div :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ app.title }}
      </h1>
      <h2 :class="b('sub-title')">
        Buy .zil domains for $10
      </h2>
      <SearchInput
        v-model="domain"
        :class="b('search-input')"
        @click="domainSubmit"
      />
      <div :class="b('wallet-info')">
        <div :class="b('network')">
          {{ walletState.network }}
        </div>
        <div :class="b('address')">
          {{ walletState.currentAddress }}
        </div>
      </div>
      <DomainView
        v-if="domainInfo && domain"
        :class="b('domain-view')"
        :info="domainInfo"
        :domain="domain"
        @register="register"
      />
    </div>
  </div>
</template>

<script>
import DomainToHash from '../../lib/ud/namehash'
import DApps from '../../static/dapps.json'

import SearchInput from '../../components/Search'
import DomainView from '../../views/unstoppabledomains/DomainView'

import ZilPayMixin from '../../mixins/zilpay'

const DEFAULT_ZONE = 'zil'
const UD_API = 'https://unstoppabledomains.com/api/v1'
const UD_TOKEN = 'v3swdv21edx3sb5s2o9rosi0qi3vsxiv'
const UD_CONTRACT_ADDRESS = 'zil156v6kay07jasewt7dalu3p3lxacc27x08v4v7u'
const headers = {
  Authentication: `Bearer ${UD_TOKEN}`
}

export default {
  name: 'Unstoppabledomains',
  components: {
    SearchInput,
    DomainView
  },
  mixins: [ZilPayMixin],
  data () {
    return {
      domain: '',
      address: UD_CONTRACT_ADDRESS,
      domainInfo: null,
      needNetwork: ['testnet', 'mainnet']
    }
  },
  computed: {
    app () {
      const name = this.$options.name.toLowerCase()
      return DApps.find(app => app.link === name)
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.isLoad()
      this.observable()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async domainSubmit () {
      this.$nuxt.$loading.start()
      const zone = this.domain.substr(this.domain.length - 4)
      if (zone !== `.${DEFAULT_ZONE}`) {
        this.domain += `.${DEFAULT_ZONE}`
      }
      this.domainInfo = await this.getContractField()
      // console.log(this.domainInfo)
      this.$nuxt.$loading.finish()
    },
    async getContractField () {
      const url = `${UD_API}/${this.domain}`
      const url2 = `${UD_API}/resellers/zilpay/domains/${this.domain}`
      try {
        console.log(await this.$axios.$get(url2, { headers }))
        return await this.$axios.$get(url, { headers })
      } catch (err) {
        return null
      }
    },
    async register () {
      const test = this.zilPayTest()
      if (!test) {
        return null
      }
      const { contracts, utils } = window.zilPay
      const { units, BN, Long } = utils
      const contract = contracts.at(this.address)
      const gasPrice = units.toQa('1000', units.Units.Li)
      const gasLimit = Long.fromNumber(9000)
      try {
        await contract.call(
          'TransferFrom',
          [
            {
              vname: 'parent',
              type: 'ByStr32',
              value: DomainToHash(this.domain)
            },
            {
              vname: 'label',
              type: 'String',
              value: this.domain
            }
          ],
          {
            gasPrice,
            gasLimit,
            amount: new BN(10)
          }
        )
      } catch (err) {
        // If user reject
      }
    }
  }
}
</script>

<style lang="scss">
.Unstoppabledomains {
  height: 100vh;
  background-color: $background;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding-top: 120px;
  }

  &__title {
    font-size: $xl-font;
    line-height: 1;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__wallet-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: $primary;
    max-width: 500px;
    width: 100%;

    padding: 3px;
  }

  &__sub-title {
    padding-top: 10px;
    font-weight: 400;
    line-height: 1.33;
  }

  &__search-input,
  &__domain-view {
    margin-top: 40px;
  }
}
</style>
