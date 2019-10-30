<template>
  <div :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ app.title }}
      </h1>
      <h2 :class="b('sub-title')">
        Manage your domain via ZilPay.
      </h2>
      <SearchInput
        v-model.lazy="domain"
        :class="b('search-input')"
        @click="domainSubmit"
      />
      <div :class="b('wallet-info')">
        <div :class="b('network')">
          {{ myAddress }}
        </div>
        <div :class="b('address')">
          {{ walletState.currentAddress }}
        </div>
      </div>
      <div
        v-if="isViewDomain"
        :class="b('result', { variant: varianReserved })"
      >
        <img
          :class="b('result-icon')"
          :src="varianIcon"
          height="20"
        >
        <div :class="b('text-resolver')">
          Resolver information:
        </div>
        <ViewBlockLink
          v-if="isReserved"
          :address="owner"
          :class="b('domain-resolver')"
        >
          {{ owner }}
        </ViewBlockLink>
        <span
          v-if="!isReserved"
          :class="b('resolver-danger')"
        >
          Reserved Domain: This name is reserved.
        </span>
      </div>
      <div
        v-if="isViewDomain && isReserved"
        :class="b('price-result', { variant: types.primary })"
      >
        <div :class="b('text-resolver')">
          Total Amount:
        </div>
        <span :class="b('price-resolver')">
          ${{ domainPrice }}
        </span>
      </div>
      <div :class="b('row')">
        <ContractForm
          v-if="myAddress"
          :class="b('domain-view')"
          :domain="myAddress"
          @transfer="transfer"
          @assign="assign"
          @approve="approve"
        />
      </div>
    </div>
    <Modal
      :name="modalInstance.name"
      :title="modalInstance.title"
    >
      <div :class="b('modal-content')">
        <img
          width="300"
          :src="modalInstance.img"
          :class="b('modal-img')"
        >
      </div>
    </Modal>
    <Modal
      :name="modalTxConfirm.name"
      :title="modalTxConfirm.title"
    >
      <div :class="b('modal-content')">
        <img
          width="200"
          src="/icons/confirmation.svg"
          :class="b('modal-img')"
        >
        <ViewBlockLink
          v-if="modalTxConfirm.tx"
          :hash="modalTxConfirm.tx"
        >
          View on ViewBlock.io
        </ViewBlockLink>
      </div>
    </Modal>
  </div>
</template>

<script>
import DApps from '../../static/dapps.json'
import TYPES from '../../static/types.json'

import SearchInput from '../../components/Search'
import ContractForm from '../../views/unstoppabledomains/ContractForm'
import Modal from '../../components/Modal'
import ViewBlockLink from '../../components/ViewBlockLink'

import ZilPayMixin from '../../mixins/zilpay'
import UDMixin from '../../mixins/ud'

const storage = window.localStorage

export default {
  name: 'Unstoppabledomains',
  components: {
    SearchInput,
    ContractForm,
    Modal,
    ViewBlockLink
  },
  mixins: [ZilPayMixin, UDMixin],
  data () {
    return {
      types: TYPES,
      domain: '',
      currentDomainByAddress: null,
      domainInfo: null,
      needNetwork: ['mainnet'],
      modalInstance: {
        name: 'modal-view',
        title: 'ZilPay'
      },
      modalTxConfirm: {
        name: 'modal-tx',
        title: 'Transaction In Process',
        tx: ''
      }
    }
  },
  computed: {
    app () {
      const name = this.$options.name.toLowerCase()
      return DApps.find(app => app.link === name)
    },
    owner () {
      try {
        return window
          .zilPay
          .crypto
          .toBech32Address(this.domainInfo.owner)
      } catch (err) {
        return null
      }
    },
    domainWithZone () {
      return this.domainValidate(this.domain)
    },
    isReserved () {
      if (!this.domainInfo || this.domain.length < 4) {
        return null
      }
      return Boolean(this.domainInfo.owner)
    },
    varianReserved () {
      if (this.isReserved) {
        return this.types.primary
      }
      return this.types.danger
    },
    varianIcon () {
      const url = '/icons'
      if (this.varianReserved === this.types.primary) {
        return `${url}/confirmation.svg`
      } else if (this.varianReserved === this.types.danger) {
        return `${url}/cancel.svg`
      }

      return null
    },
    isViewDomain () {
      if (!this.domainInfo) {
        return false
      } else if (!this.domainInfo.domainHash) {
        return false
      } else if (!this.domain || !this.domainInfo.domain.includes(this.domain)) {
        return false
      }
      return true
    },
    myAddress () {
      if (this.currentDomainByAddress && !this.domainInfo) {
        return this.currentDomainByAddress
      } else if (!this.domainInfo) {
        return null
      }

      const current = this.validateAddreas(this.walletState.currentAddress).toLowerCase()
      let { owner } = this.domainInfo

      if (owner) {
        try {
          owner = this.validateAddreas(owner)
          owner = owner.toLowerCase()
        } catch (err) {}

        if (owner === current) {
          return this.domainValidate(this.domain)
        }
      }

      return null
    },
    domainPrice () {
      if (!this.domainInfo.price) {
        return 0
      }
      return Number(this.domainInfo.price) / 100
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.isLoad()
      this.zilPayTest()
      this.observable(currentState => this.addressCb(currentState))
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    addressCb (defaultAddress) {
      this.currentDomainByAddress = storage.getItem(defaultAddress.base16)
      this.domainSubmit()
    },
    async domainSubmit () {
      this.$nuxt.$loading.start()
      let currentAddress = null

      try {
        currentAddress = this.validateAddreas(this.walletState.currentAddress)
        this.domainInfo = await this.udDomainBN()
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }

      if (this.myAddress) {
        storage.setItem(currentAddress, this.myAddress)
      } else {
        storage.removeItem(currentAddress.toLowerCase())
      }
    }
  }
}
</script>

<style lang="scss">
.Unstoppabledomains {
  min-height: 100vh;
  background-color: $background;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding-top: 120px;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    width: 100%;
    max-width: 900px;
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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    color: $primary;
    max-width: 500px;
    width: 100%;

    padding: 3px;
  }

  &__result,
  &__price-result {
    margin-top: 30px;
    padding: 10px 30px 10px;

    max-width: 400px;
    width: 100%;
    height: 60px;

    box-sizing: border-box;
    border-radius: 10px;

    &_variant-danger {
      border: 1px solid $danger;
    }

    &_variant-primary {
      border: 1px solid $primary;
    }
  }

  &__price-result {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 20px;
    line-height: 19px;
  }

  &__price-resolver {
    color: $primary;
  }

  &__result-icon {
    position: absolute;

    transform: translate(170px, -5px);
  }

  &__text-resolver {
    color: $white;
    font-size: 20px;
    line-height: 23px;
  }

  &__domain-resolver,
  &__resolver-danger {
    color: $primary;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  &__resolver-danger {
    color: $danger;
  }

  &__sub-title {
    padding-top: 10px;
    font-weight: 400;
    line-height: 1.33;
  }

  &__search-input,
  &__domain-view {
    margin-top: 20px;
  }

  &__modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    height: auto;
    width: auto;
  }
}
</style>
