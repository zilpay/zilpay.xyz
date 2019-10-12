<template>
  <div>
    <form :class="b()" @submit.prevent="submit">
      <Input
        v-model="node"
        :variant="types.warning"
        :class="b('form-input')"
        label="Domain"
        md
        block
      />
      <Input
        v-model="owner"
        :variant="types.warning"
        :class="b('form-input')"
        label="New owner"
        md
        block
      />
      <Button
        :variant="types.warning"
        :class="b('transfer-btn')"
        md
        @click="submit"
      >
        Transfer
      </Button>
    </form>
  </div>
</template>

<script>
import TYPES from '../../../static/types.json'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default {
  name: 'Transfer',
  components: {
    Input,
    Button
  },
  data () {
    return {
      node: null,
      owner: null,
      types: TYPES
    }
  },
  methods: {
    submit () {
      this.$emit('submit', {
        node: this.node,
        owner: this.owner
      })
    }
  }
}
</script>

<style lang="scss">
.Transfer {
  text-align: left;

  &__form-input {
    margin-top: 10px;
  }

  &__transfer-btn {
    margin-top: 20px;
  }
}
</style>
