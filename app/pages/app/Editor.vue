<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('row')">
        <Jumbotron :class="b('files')">
          <tree-view
            :data="files"
            :options="initOptions"
          />
        </Jumbotron>
        <client-only placeholder="Scilla Loading...">
          <codemirror
            v-model="code"
            :class="b('code-editor')"
            :options="cmOption"
          />
        </client-only>
        <Jumbotron :class="b('contract-init')">
          <Button
            md
            :class="b('deploy-btn')"
          >
            Deploy
          </Button>
          <tree-view
            :data="init"
            :options="initOptions"
          />
        </Jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/moxer.css'

import { codemirror } from 'vue-codemirror'
import '../../lib/scilla/mllike'

import Jumbotron from '../../components/Jumbotron'
import Button from '../../components/Button'

export default {
  name: 'Editor',
  components: {
    codemirror,
    Jumbotron,
    Button
  },
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
        rootObjectKey: 'init'
      },
      init: {
        test: 'test'
      },
      files: [
        'contract.test',
        'contract1.test',
        'contract2.test'
      ]
    }
  },
  mounted () {
    this.getContract()
  },
  methods: {
    async getContract () {
      this.code = await this.$axios.$get(
        window.location.origin + '/contracts/HelloWord.scilla'
      )
    }
  }
}
</script>

<style lang="scss">
.Editor {
  height: 100vh;
  background-color: $background;

  &__container {
    display: flex;
    flex-direction: column;
    padding-top: 13vh;
    height: 100vh;
  }

  &__row {
    display: flex;
  }

  &__column {
  }

  &__contract-init {
    width: 30%;
  }

  &__files {
    width: 15%;
  }

  &__code-editor {
    width: 60%;
  }

  &__deploy-btn {
    text-align: right;
    margin-bottom: 30px;
  }

  .Jumbotron {
    height: 87vh;
  }
}
.CodeMirror {
  height: 87vh;
}
.CodeMirror-vscrollbar {
  display: none !important;
}
</style>
