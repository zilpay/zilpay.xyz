<template>
  <div :class="b()">
    <Button
      :class="b('deploy-btn')"
      :variant="types.danger"
      sm
      block
      @click="deploy"
    >
      DEPLOY
    </Button>
    <Alert
      :class="b('warn')"
      :variant="types.dark"
    >
      List params comma separated.
    </Alert>
    <Input
      v-for="model of models"
      :key="model.vname"
      v-model="model.value"
      :class="b('init-input')"
      :variant="types.warning"
      sm
      block
      :placeholder="model.type"
      :label="model.vname"
    />
  </div>
</template>

<script>
import TYPES from '@/static/types.json'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Alert from '@/components/Alert'

export default {
  name: 'Init',
  components: {
    Input,
    Button,
    Alert
  },
  props: {
    structure: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      types: TYPES,
      models: this.structure.params.map(el => ({
        ...el,
        value: ''
      }))
    }
  },
  methods: {
    deploy () {
      this.models = this.models.map((param) => {
        if (param.type.includes('with') && param.type.includes('ByStr20')) {
          param.type = 'ByStr20'
        }

        return param
      })
      this.$emit('deploy', this.models)
    }
  }
}
</script>

<style lang="scss">
.Init {
  &__init-input {
    margin-top: 10px;
  }

  &__warn {
    margin-top: 20px;
  }
}
</style>
