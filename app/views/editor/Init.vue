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
    <Input
      v-for="model of models"
      :key="model.vname"
      :class="b('init-input')"
      :variant="types.warning"
      v-model="model.value"
      sm
      block
      :placeholder="model.type"
      :label="model.vname"
    />
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Button from '../../components/Button'
import Input from '../../components/Input'

export default {
  name: 'Init',
  components: {
    Input,
    Button
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
}
</style>
