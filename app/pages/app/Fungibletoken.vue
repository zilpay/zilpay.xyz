<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('row')">
        <DeployForm
          :class="b('column')"
          :form="createForm"
        />
        <ConnectForm :class="b('column')" />
      </div>
    </div>
  </div>
</template>

<script>
import DeployForm from '../../views/fungibletoken/FormDeploy'
import ConnectForm from '../../views/fungibletoken/ConnectForm'

import ZilPayMixin from '../../mixins/zilpay'

export default {
  name: 'Fungibletoken',
  components: {
    DeployForm,
    ConnectForm
  },
  mixins: [ZilPayMixin],
  data () {
    return {
      createForm: {
        owner: '',
        tokenName: '',
        tokenSymbol: '',
        totalSupply: '',
        decimals: ''
      }
    }
  }
}
</script>

<style lang="scss">
$indentation: 100vw - 100;

.Fungibletoken {
  background-color: $background;
  height: 100vh;

  &__container {
    height: 100%;

    padding-top: 14vh;
    padding-left: $indentation;
    padding-right: $indentation;
  }

  &__row {
    background-color: $background;

    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
  }

  &__column {
    margin-top: 30px;
  }

  &__title {
    margin-bottom: 10px;
  }
}
</style>
