// import DomainToHash from '../lib/ud/namehash'

const DEFAULT_ZONE = 'zil'
const UD_API = 'https://unstoppabledomains.com/api'
const UD_API_VERSION = 'v1'
// const UD_CONTRACT_ADDRESS = 'zil156v6kay07jasewt7dalu3p3lxacc27x08v4v7u'

export default {
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
    async register () {
    }
  }
}
