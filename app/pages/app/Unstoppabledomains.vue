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
          brad.zil
        </div>
        <div :class="b('address')">
          {{ walletState.currentAddress }}
        </div>
      </div>
      <div :class="b('result')">
        <Alert
          v-show="isReserved !== null"
          :variant="varianReserved"
          :class="b('domain-name')"
        >
          <span :class="b('domain')">
            {{ domainWithZone }}:
          </span>
          <span :class="b('domain-resolver')">
            {{ textReserved }}
          </span>
        </Alert>
      </div>
      <div :class="b('row')">
        <ContractForm
          v-if="isOwnerDomain"
          :class="b('domain-view')"
          :domain="domain"
          @transfer="transfer"
        />
        <DomainView
          v-if="isViewDomain"
          :class="b('domain-view')"
          :info="domainInfo"
          :domain="domain"
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
import DomainView from '../../views/unstoppabledomains/DomainView'
import ContractForm from '../../views/unstoppabledomains/ContractForm'
import Modal from '../../components/Modal'
import Alert from '../../components/Alert'
import ViewBlockLink from '../../components/ViewBlockLink'

import ZilPayMixin from '../../mixins/zilpay'
import UDMixin from '../../mixins/ud'

export default {
  name: 'Unstoppabledomains',
  components: {
    SearchInput,
    DomainView,
    ContractForm,
    Modal,
    Alert,
    ViewBlockLink
  },
  mixins: [ZilPayMixin, UDMixin],
  data () {
    return {
      types: TYPES,
      domain: '',
      domainInfo: null,
      needNetwork: ['testnet', 'mainnet'],
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
    domainWithZone () {
      return this.domainValidate(this.domain)
    },
    isReserved () {
      if (!this.domainInfo) {
        return null
      }
      return Boolean(this.domainInfo.meta.owner)
    },
    textReserved () {
      if (this.isReserved === null) {
        return null
      } else if (this.isReserved) {
        return 'Resolver Information'
      }
      return 'Reserved Domain: This name is reserved.'
    },
    varianReserved () {
      if (this.isReserved) {
        return this.types.warngin
      }
      return this.types.danger
    },
    isViewDomain () {
      if (!this.domainInfo) {
        return false
      } else if (!this.domainInfo.meta.owner) {
        return false
      } else if (!this.domain) {
        return false
      }
      return true
    },
    isOwnerDomain () {
      return this.isViewDomain
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()

      await this.isLoad()
      this.zilPayTest()
      this.observable()

      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async domainSubmit () {
      this.$nuxt.$loading.start()

      const info = await this.udDomain()
      info.price = await this.udPrice()

      this.domainInfo = info
      this.$nuxt.$loading.finish()
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

  &__result {
    padding: 20px 20px 0;

    max-width: 500px;
    width: 100%;
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

  &__domain,
  &__domain-resolver {
    color: $success;
  }

  &__domain-name {
    display: flex;
    justify-content: space-between;
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
