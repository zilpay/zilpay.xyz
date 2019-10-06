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
import '../../lib/scilla/mllike'

import { codemirror } from 'vue-codemirror'

import Actions from '../../views/editor/Actions'
import Modal from '../../components/Modal'

import ZilPayMixin from '../../mixins/zilpay'

const SCILA_RUNNER = 'https://scilla-runner.zilliqa.com/contract'
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
        title: 'Scilla contract structure'
      },
      structure: null,
      structureTree: null,
      state: null
    }
  },
  mounted () {
    this.getContract()
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.isLoad()
      this.observable()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getContract () {
      this.code = await this.$axios.$get(
        window.location.origin + '/contracts/HelloWord.scilla'
      )
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
      const gasLimit = Long.fromNumber(10000)
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
    display: flex;
  }

  &__code-editor {
    min-width: 60vw;
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
  height: calc(100vh - 128px);
}
.CodeMirror-vscrollbar {
  display: none !important;
}
.CodeMirror-line {
  z-index: 2 !important;
  font-size: 12px !important;
}
</style>
