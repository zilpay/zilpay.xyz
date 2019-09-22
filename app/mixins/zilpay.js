export default {
  data () {
    return {
      walletState: {
        currentAddress: null,
        network: null
      },
      observables: {
        address: null,
        network: null
      }
    }
  },
  beforeDestroy () {
    if (this.observables.network) {
      this.observables.network.unsubscribe()
    }
    if (this.observables.address) {
      this.observables.address.unsubscribe()
    }
  },
  methods: {
    zilPayTest () {
      if (!process.client) {
        return false
      }

      if (typeof window.zilPay === 'undefined') {
        this.rollModal.img = '/img/home.png'
        this.rollModal.title = 'Please install ZilPay!'
        this.$modal.show(this.rollModal.name)
        return false
      } else if (!window.zilPay.wallet.isEnable) {
        this.rollModal.img = '/img/lock.png'
        this.rollModal.title = 'Please unlock ZilPay!'
        this.$modal.show(this.rollModal.name)
        return false
      } else if (window.zilPay.wallet.net !== 'testnet') {
        this.rollModal.img = '/img/network.png'
        this.rollModal.title = 'Please change network!'
        this.$modal.show(this.rollModal.name)
        return false
      }

      try {
        this.$modal.close(this.rollModal.name)
      } catch (err) {
        // If modal was't open.
      }

      return true
    },
    observable () {
      try {
        this.observables.address = window
          .zilPay
          .wallet
          .observableAccount()
          .subscribe((acc) => {
            this.walletState.currentAddress = acc.bech32
          })
      } catch (err) {
        // Skip
      }

      try {
        this.walletState.network = window.zilPay.wallet.net
        this.observables.network = window
          .zilPay
          .wallet
          .observableNetwork()
          .subscribe((net) => {
            this.walletState.network = net
            this.zilPayTest()
          })
      } catch (err) {
        // Skip
      }
    }
  }
}
