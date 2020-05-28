<template>
  <div :class="b()">
    <div :class="b('zil-pay-container')">
      <span :class="b('net')">
        {{ walletState.network }}
      </span>
      <span :class="b('address')">
        {{ walletState.currentAddress }}
      </span>
    </div>
    <div :class="b('container')">
      <div :class="b('row')">
        <client-only placeholder="Scilla Loading...">
          <codemirror
            v-model="code"
            :class="b('code-editor')"
            :options="cmOption"
          />
        </client-only>
        <Actions
          :structure="structure"
          @compile="codeCheck"
          @structure="showStructure"
          @deploy="deploy"
          @state="getState"
          @init="getInit"
          @code="getContractCodeByAddress"
        />
      </div>
    </div>
    <Modal
      :name="modalInstance.name"
      :title="modalInstance.title"
    >
      <div :class="b('modal-content')">
        <tree-view
          :data="structureTree || state"
          :options="initOptions"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/moxer.css'
import '@/lib/scilla/mllike'

import { codemirror } from 'vue-codemirror'

import Modal from '@/components/Modal'

import ZilPayMixin from '@/mixins/zilpay'
import Actions from '@/views/editor/Actions'

const SCILA_RUNNER = 'https://scilla-server.zilliqa.com/contract'
const SCILLA_METHODS = {
  check: 'check'
}

export default {
  name: 'Editor',
  components: {
    codemirror,
    Actions,
    Modal
  },
  mixins: [ZilPayMixin],
  data () {
    return {
      code: '',
      cmOption: {
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        theme: 'moxer'
      },
      initOptions: {
        rootObjectKey: 'result'
      },
      modalInstance: {
        name: 'structure',
        title: 'Scilla contract structure',
        img: null
      },
      structure: null,
      structureTree: null,
      state: null,
      needNetwork: ['testnet', 'mainnet', 'private']
    }
  },
  watch: {
    code: (newValue, oldValue) => {
      if (newValue !== oldValue) {
        window.localStorage.setItem('code', newValue)
      }
    }
  },
  mounted () {
    this.getContract()
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.isLoad()
      this.zilPayTest()
      this.observable()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    getContract () {
      const code = window.localStorage.getItem('code')

      if (code) {
        this.code = code
      }
    },
    async getContractCodeByAddress (address) {
      if (this.$nuxt && this.$nuxt.$loading && typeof this.$nuxt.$loading.start === 'function') {
        this.$nuxt.$loading.start()
      }

      try {
        const validateAddress = this.validateAddreas(address)
        const { result } = await window
          .zilPay
          .blockchain
          .getSmartContractCode(validateAddress)

        this.code = result.code

        await this.codeCheck()
      } catch (err) {
        //
      } finally {
        // this.$nuxt.$loading.finish()
      }
    },
    async codeCheck () {
      const url = `${SCILA_RUNNER}/${SCILLA_METHODS.check}`
      try {
        const { message } = await this
          .$axios
          .$post(url, { code: this.code })
        this.structure = JSON.parse(message)
        this.structureTree = this.structure
      } catch (err) {
        //
      }
    },
    async showStructure () {
      if (!this.structureTree) {
        await this.codeCheck()
      }
      this.state = null
      this.$modal.show(this.modalInstance.name)
    },
    async getState (address) {
      this.$nuxt.$loading.start()
      const validateAddress = this.validateAddreas(address)
      const { contracts } = window.zilPay
      const contract = contracts.at(validateAddress)
      try {
        this.state = await contract.getState()
        this.structureTree = null
        this.modalInstance.title = 'Contract state'
        this.$modal.show(this.modalInstance.name)
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async getInit (address) {
      this.$nuxt.$loading.start()
      const validateAddress = this.validateAddreas(address)
      const { contracts } = window.zilPay
      const contract = contracts.at(validateAddress)
      try {
        this.state = await contract.getInit()
        this.structureTree = null
        this.modalInstance.title = 'Contract init'
        this.$modal.show(this.modalInstance.name)
      } catch (err) {
        //
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async deploy (models) {
      const init = models.map((el) => {
        try {
          el.value = this.validateAddreas(el.value)
        } catch (err) {
          //
        }

        if (el.type.includes('List')) {
          el.value = el.value.split(',')
        }

        return el
      }).concat([{
        vname: '_scilla_version',
        type: 'Uint32',
        value: this.structure.contract_info.scilla_major_version
      }])

      const code = this.code
      const { units, Long } = window.zilPay.utils
      const { toBech32Address } = window.zilPay.crypto
      const contract = window.zilPay.contracts.new(code, init)
      const gasPrice = units.toQa('1000', units.Units.Li)
      const gasLimit = Long.fromNumber(25000)

      try {
        const [deployTx, newContract] = await contract.deploy({
          gasPrice,
          gasLimit
        })
        const bech32 = toBech32Address(newContract.address)
        this.structureTree = null
        this.state = deployTx.txParams
        this.modalInstance.title = `contract address: ${bech32}`
        this.$modal.show(this.modalInstance.name)
      } catch (err) {
        //
      }
    }
  }
}
</script>

<style lang="scss">
.Editor {
  height: 100vh;
  background-color: $background;

  &__zil-pay-container {
    display: flex;
    justify-content: space-between;
    padding: 100px 10px 0;
  }

  &__net, &__address {
    color: $primary;
  }

  &__container {
    display: flex;
    flex-direction: column;
    padding-top: 9px;
  }

  &__row {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  &__code-editor {
    min-width: 59vw;
  }

  &__deploy-btn {
    text-align: right;
    margin-bottom: 30px;
  }

  &__modal-content {
    padding: 50px;
    min-width: 50vw;
    max-height: 90vh;
    overflow:scroll;
  }
}
.CodeMirror {
  position: unset;
  height: calc(100vh - 130px);
}
.CodeMirror-vscrollbar {
}
.CodeMirror-line {
  z-index: 2 !important;
  font-size: 12px !important;
}
</style>
