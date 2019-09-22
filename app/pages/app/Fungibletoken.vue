<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('row')">
        <DeployForm
          v-model="createForm"
          :class="b('column')"
          @submit="submit"
        />
        <ConnectForm
          v-if="!contractState"
          :class="b('column')"
          @submit="connectContrac"
        />
        <ConnectViewer
          v-if="contractState"
          :class="b('column')"
          :state="contractState"
          @clear="contractState = null"
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
  </div>
</template>

<script>
import DeployForm from '../../views/fungibletoken/FormDeploy'
import ConnectForm from '../../views/fungibletoken/ConnectForm'
import ConnectViewer from '../../views/fungibletoken/ContractView'

import Modal from '../../components/Modal'

import ZilPayMixin from '../../mixins/zilpay'

export default {
  name: 'Fungibletoken',
  components: {
    DeployForm,
    ConnectForm,
    ConnectViewer,
    Modal
  },
  mixins: [ZilPayMixin],
  data () {
    return {
      createForm: {
        owner: null,
        tokenName: null,
        tokenSymbol: null,
        totalSupply: 90000,
        decimals: 18
      },
      contractAddress: null,
      contractState: null,
      needNetwork: ['testnet', 'mainnet', 'private'],
      modalInstance: {
        title: 'ZilPay',
        name: this.$options.name,
        img: null
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.observable(acc => (this.createForm.owner = acc.bech32))
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async submit (event) {
      const test = this.zilPayTest()
      if (!test) {
        return null
      }
      this.$nuxt.$loading.start()
      const { utils, contracts } = window.zilPay
      const { units, Long } = utils
      // const { toBech32Address } = crypto
      const code = await this.$axios.$get('/contracts/fungible-token.scilla')
      const init = [
        {
          vname: '_scilla_version',
          type: 'Uint32',
          value: '0'
        },
        {
          vname: 'owner',
          type: 'ByStr20',
          value: this.validateAddreas(this.createForm.owner)
        },
        {
          vname: 'total_tokens',
          type: 'Uint128',
          value: String(this.createForm.totalSupply)
        },
        {
          vname: 'decimals',
          type: 'Uint32',
          value: String(this.createForm.decimals)
        },
        {
          vname: 'name',
          type: 'String',
          value: this.createForm.tokenName
        },
        {
          vname: 'symbol',
          type: 'String',
          value: this.createForm.tokenSymbol
        }
      ]
      const contract = contracts.new(code, init)
      const gasPrice = units.toQa('1500', units.Units.Li)
      const gasLimit = Long.fromNumber(10000)
      try {
        // const [deployTx, newContract] =
        await contract.deploy({
          gasPrice, gasLimit
        })
      } catch (err) {
        // If reject or any errors
      }
      this.$nuxt.$loading.finish()
    },
    async connectContrac (contractAddress) {
      const test = this.zilPayTest()
      if (!test) {
        return null
      }
      try {
        this.$nuxt.$loading.start()
        const { contracts } = window.zilPay
        const contract = contracts.at(contractAddress)
        this.contractAddress = contractAddress
        this.contractState = await contract.getState()
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }
    }
  }
}
</script>

<style lang="scss">
$indentation: 100vw - 100;

.Fungibletoken {
  background-color: $background;
  height: 100vh;

  &__container {
    height: 100%;

    padding-top: 14vh;
    padding-left: $indentation;
    padding-right: $indentation;
  }

  &__row {
    background-color: $background;

    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
  }

  &__column {
    margin-top: 30px;
  }

  &__title {
    margin-bottom: 10px;
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
