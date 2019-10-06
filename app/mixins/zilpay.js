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
    isLoad () {
      return new Promise((resolve) => {
        if (window.document.readyState === 'complete') {
          resolve(true)
        }
        window.onload = function () {
          resolve(true)
        }
      })
    },
    zilPayTest () {
      if (!process.client) {
        return false
      }

      if (typeof window.zilPay === 'undefined') {
        this.modalInstance.img = '/img/home.png'
        this.modalInstance.title = 'Please install ZilPay!'
        this.$modal.show(this.modalInstance.name)
        return false
      } else if (!window.zilPay.wallet.isEnable) {
        this.modalInstance.img = '/img/lock.png'
        this.modalInstance.title = 'Please unlock ZilPay!'
        this.$modal.show(this.modalInstance.name)
        return false
      } else if (!this.needNetwork.includes(window.zilPay.wallet.net)) {
        this.modalInstance.img = '/img/network.png'
        this.modalInstance.title = 'Please change network!'
        this.$modal.show(this.modalInstance.name)
        return false
      } else if (!window.zilPay.wallet.isConnect) {
        window.zilPay.wallet.connect()
        return null
      }

      try {
        this.$modal.close(this.modalInstance.name)
      } catch (err) {
        // If modal was't open.
      }

      return true
    },
    observable (cbAddress, cbNet) {
      try {
        this.walletState.currentAddress = window.zilPay.wallet.defaultAccount.bech32
        if (typeof cbAddress === 'function') {
          cbAddress(window.zilPay.wallet.defaultAccount)
        }
        this.observables.address = window
          .zilPay
          .wallet
          .observableAccount()
          .subscribe((acc) => {
            this.walletState.currentAddress = acc.bech32
            if (typeof cbAddress === 'function') {
              cbAddress(acc)
            }
          })
      } catch (err) {
        // Skip
      }

      try {
        this.walletState.network = window.zilPay.wallet.net
        if (typeof cbNet === 'function') {
          cbNet(window.zilPay.wallet.net)
        }
        this.observables.network = window
          .zilPay
          .wallet
          .observableNetwork()
          .subscribe((net) => {
            this.walletState.network = net
            this.zilPayTest()
            if (typeof cbNet === 'function') {
              cbNet(net)
            }
          })
      } catch (err) {
        // Skip
      }
    },
    validateAddreas (address) {
      const { utils, crypto } = window.zilPay
      const { validation } = utils
      const {
        decodeBase58,
        toChecksumAddress,
        fromBech32Address,
        isValidChecksumAddress
      } = crypto

      if (validation.isAddress(address)) {
        address = isValidChecksumAddress(address)
      } else if (validation.isBase58(address)) {
        address = decodeBase58(address)
      } else if (validation.isBech32(address)) {
        address = fromBech32Address(address)
      }

      return toChecksumAddress(address)
    }
  }
}
