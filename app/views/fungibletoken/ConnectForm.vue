<template>
  <div>
    <Jumbotron :class="b()">
      <h1 :class="b('title')">
        FungibleToken Connect
      </h1>
      <Alert :variant="types.info">
        <p>
          You can connect your FungibleToken for call to call his methods.
        </p>
      </Alert>
      <Input
        v-model="address"
        placeholder="Enter your contract address"
        label="Contract owner:"
        md
        block
        :variant="types.primary"
        :class="b('form-input')"
      />
      <Button
        md
        block
        :class="b('form-button')"
        @click="submit"
      >
        Connect
      </Button>
    </Jumbotron>
  </div>
</template>

<script>
import TYPES from '@/static/types.json'

import Jumbotron from '@/components/Jumbotron'
import Input from '@/components/Input'
import Alert from '@/components/Alert'
import Button from '@/components/Button'

export default {
  name: 'ConnectForm',
  components: {
    Jumbotron,
    Input,
    Alert,
    Button
  },
  data () {
    return {
      types: TYPES,
      address: null
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.address)
    }
  }
}
</script>

<style lang="scss">
.ConnectForm {
  &__form-input,
  &__form-button {
    padding-top: 20px;
  }
}
</style>
