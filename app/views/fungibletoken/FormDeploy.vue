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
        :variant="types.primary"
        placeholder="Enter your zil address"
        label="Contract owner:"
      />
    </Jumbotron>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Jumbotron from '../../components/Jumbotron'
import Input from '../../components/Input'
import Alert from '../../components/Alert'

export default {
  name: 'FormDeploy',
  components: {
    Jumbotron,
    Input,
    Alert
  },
  data () {
    return {
      types: TYPES
    }
  }
}
</script>

<style lang="scss">

</style>
