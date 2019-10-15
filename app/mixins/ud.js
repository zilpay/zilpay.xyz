import namehash from 'namicorn/lib/zns/namehash'

import ZilPayMixin from './zilpay'

const DEFAULT_ZONE = 'zil'
const UD_API = 'https://unstoppabledomains.com/api'
const UD_API_VERSION = 'v1'
const UD_CONTRACT_ADDRESS = 'zil156v6kay07jasewt7dalu3p3lxacc27x08v4v7u'

export default {
  mixins: [ZilPayMixin],
  data () {
    return {
      zone: DEFAULT_ZONE
    }
  },
  methods: {
    domainValidate (domainName) {
      const [domain] = domainName.split('.')
      return `${domain}.${this.zone}`
    },
    udDomain () {
      const domain = this.domainValidate(this.domain)
      const url = `${UD_API}/${UD_API_VERSION}/${domain}`
      return this.$axios.$get(url)
    },
    udPrice () {
      const [domain] = this.domain.split('.')
      const url = `${UD_API}/price?type=pre-order&label=${domain}&extension=${this.zone}`
      return this.$axios.$get(url)
    },
    udDomainToHash () {
      const domain = this.domainValidate(this.domain)
      return namehash(domain)
    },
    async transfer (event) {
      const test = this.zilPayTest()
      if (!test) {
        return null
      }
      const { contracts, utils } = window.zilPay
      const contract = contracts.at(UD_CONTRACT_ADDRESS)
      const amount = utils.units.toQa(
        '0',
        utils.units.Units.Zil
      )
      const gasPrice = utils.units.toQa(
        '1000', utils.units.Units.Li
      )
      try {
        this.$nuxt.$loading.start()
        const tx = await contract.call(
          'transfer', [
            {
              vname: 'node',
              type: 'ByStr32',
              value: event.node
            },
            {
              vname: 'owner',
              type: 'ByStr20',
              value: this.validateAddreas(event.owner)
            }
          ],
          {
            amount,
            gasPrice,
            gasLimit: utils.Long.fromNumber(9000)
          }
        )
        console.log(tx)
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }
    }
  }
}
