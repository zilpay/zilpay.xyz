import namehash from 'namicorn/lib/zns/namehash'

import ZilPayMixin from './zilpay'

const DEFAULT_ZONE = 'zil'
const UD_API = 'https://unstoppabledomains.com/api'
const UD_CONTRACT_ADDRESS = 'zil1jcgu2wlx6xejqk9jw3aaankw6lsjzeunx2j0jz'

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
    async udDomainBN () {
      const test = this.zilPayTest()
      if (!test) {
        return null
      }

      const domain = this.domainValidate(this.domain || this.currentDomainByAddress)
      const domainHash = this.udDomainToHash(domain)
      const { contracts } = window.zilPay
      const contract = contracts.at(UD_CONTRACT_ADDRESS)

      try {
        const result = await contract.getSubState('records', [domainHash])
        const price = await this.udPrice()
        const { records } = result
        const [owner] = records[domainHash].arguments

        return {
          owner,
          domainHash,
          price,
          domain
        }
      } catch (err) {
        return {
          domain,
          owner: null,
          domainHash,
          price: null
        }
      }
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
            gasLimit: utils.Long.fromNumber(5000)
          }
        )
        this.modalTxConfirm.tx = tx.TranID
        this.$modal.show(this.modalTxConfirm.name)
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async assign (event) {
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
          'assign', [
            {
              vname: 'parent',
              type: 'ByStr32',
              value: event.node
            },
            {
              vname: 'label',
              type: 'String',
              value: event.label
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
            gasLimit: utils.Long.fromNumber(5000)
          }
        )
        this.modalTxConfirm.tx = tx.TranID
        this.$modal.show(this.modalTxConfirm.name)
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async approve (event) {
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
          'approve', [
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
            gasLimit: utils.Long.fromNumber(5000)
          }
        )
        this.modalTxConfirm.tx = tx.TranID
        this.$modal.show(this.modalTxConfirm.name)
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }
    }
  }
}
