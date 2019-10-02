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
        />
      </div>
    </div>
    <Modal
      :name="modalInstance.name"
      :title="modalInstance.title"
    >
      <div :class="b('modal-content')">
        <tree-view
          :data="structure"
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
        rootObjectKey: 'structure'
      },
      modalInstance: {
        name: 'structure',
        title: 'Scilla contract structure'
      },
      structure: null
    }
  },
  mounted () {
    this.getContract()
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
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
      const { message } = await this
        .$axios
        .$post(url, { code: this.code })
      this.structure = JSON.parse(message)
    },
    async showStructure () {
      if (!this.structure) {
        await this.codeCheck()
      }
      this.$modal.show(this.modalInstance.name)
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
    padding: 12vh 10px 0;
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
    min-width: 50vw;
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
  height: 85vh;
}
.CodeMirror-vscrollbar {
  display: none !important;
}
.CodeMirror-line {
  z-index: 2 !important;
  font-size: 12px !important;
}
</style>
