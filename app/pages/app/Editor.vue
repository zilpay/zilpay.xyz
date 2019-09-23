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
        <codemirror
          v-model="code"
          :class="b('code-editor')"
          :options="cmOptions"
        />
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
import { codemirror } from 'vue-codemirror'

import Jumbotron from '../../components/Jumbotron'
import Button from '../../components/Button'

import 'codemirror/lib/codemirror.css'

export default {
  name: 'Editor',
  components: {
    codemirror,
    Jumbotron,
    Button
  },
  data () {
    return {
      code: 'const a = 10',
      cmOptions: {
        styleActiveLine: true,
        tabSize: 4,
        mode: 'text/javascript',
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        extraKeys: { Ctrl: 'autocomplete' }
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
  background: #21282d;
}
.CodeMirror-gutters {
  background: #191e22;
}
</style>
