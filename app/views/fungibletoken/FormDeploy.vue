<template>
  <div>
    <Jumbotron :class="b()">
      <h1 :class="b('title')">
        FungibleToken creator
      </h1>
      <Alert :variant="types.info">
        <p>
          This dApp is a form to create fungible tokens.
        </p>
      </Alert>
      <Input
        v-model="form.owner"
        placeholder="Enter your zil address"
        label="Contract owner:"
        type="text"
        :variant="types.primary"
        :class="b('form-input')"
        @input="onInput"
      />
      <Input
        v-model="form.tokenName"
        placeholder="Enter your token name"
        label="Token name:"
        type="text"
        :variant="types.primary"
        :class="b('form-input')"
        @input="onInput"
      />
      <Input
        v-model="form.tokenSymbol"
        placeholder="Enter your token symbol"
        label="Token symbol:"
        type="text"
        :variant="types.primary"
        :class="b('form-input')"
        @input="onInput"
      />
      <Input
        v-model="form.totalSupply"
        placeholder="Enter your count of tokens"
        label="Total supply of tokens:"
        type="number"
        :variant="types.primary"
        :class="b('form-input')"
        @input="onInput"
      />
      <Input
        v-model="form.decimals"
        type="number"
        label="Decimals:"
        :variant="types.primary"
        :class="b('form-input')"
        @input="onInput"
      />
      <Button
        md
        block
        :class="b('form-button')"
        @click="submit"
      >
        Deploy
      </Button>
    </Jumbotron>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Jumbotron from '../../components/Jumbotron'
import Input from '../../components/Input'
import Alert from '../../components/Alert'
import Button from '../../components/Button'

export default {
  name: 'FormDeploy',
  components: {
    Jumbotron,
    Input,
    Alert,
    Button
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      types: TYPES,
      form: this.value
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.form)
    },
    onInput () {
      this.$emit('input', this.form)
    }
  }
}
</script>

<style lang="scss">
.FormDeploy {
  &__form-input,
  &__form-button {
    padding-top: 20px;
  }
}
</style>
