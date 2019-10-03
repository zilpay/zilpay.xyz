<template>
  <div :class="b()">
    <div :class="b('row')">
      <div :class="b('column', { sm: true })">
        <Input
          v-model="address"
          sm
          block
          placeholder="Enter contract address."
          :variant="types.warning"
        />
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          @click="$emit('deploy')"
        >
          DEPLOY
        </Button>
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          @click="$emit('compile')"
        >
          COMPILE
        </Button>
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          @click="$emit('structure')"
        >
          STRUCTURE
        </Button>
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          :disabled="isEnable"
          @click="$emit('state', address)"
        >
          GET STATE
        </Button>
      </div>
      <div :class="b('column', { lg: true })">
        <StructureBuilder
          v-if="structure"
          :structure="structure.contract_info"
          :disabled="isEnable"
          @transition="transition"
        />
      </div>
    </div>
    <Modal
      :name="modalInstance.name"
      :title="modalInstance.title"
    >
      <div :class="b('modal-content')">
        <tree-view
          :data="transaction"
          :options="initOptions"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import ZilPayMixin from '../../mixins/zilpay'

import Modal from '../../components/Modal'
import Button from '../../components/Button'
import Input from '../../components/Input'
import StructureBuilder from './StructureBuilder'

export default {
  name: 'Actions',
  components: {
    Button,
    StructureBuilder,
    Input,
    Modal
  },
  mixins: [ZilPayMixin],
  props: {
    structure: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      types: TYPES,
      address: '',
      modalInstance: {
        name: 'tx',
        title: 'Transaction'
      },
      initOptions: {
        rootObjectKey: 'transaction'
      },
      transaction: {}
    }
  },
  computed: {
    isEnable () {
      return this.address < 42
    }
  },
  methods: {
    async transition (transition) {
      const { contracts, utils } = window.zilPay
      const address = this.validateAddreas(this.address)
      const contract = contracts.at(address)
      const amount = utils.units.toQa(
        0,
        utils.units.Units.Zil
      )
      const gasPrice = utils.units.toQa(
        '1000', utils.units.Units.Li
      )
      try {
        this.transaction = await contract.call(
          transition.method,
          transition.params,
          {
            amount,
            gasPrice,
            gasLimit: utils.Long.fromNumber(9000)
          }
        )
        this.transaction = this.transaction.txParams
      } catch (err) {
        this.transaction = err
      }

      this.$modal.show(this.modalInstance.name)
    }
  }
}
</script>

<style lang="scss">
.Actions {
  background-color: $grey-darkest;
  height: 85vh;
  min-width: 50vw;
  max-width: 100vw;

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__column {
    padding: 10px;

    &_sm {
      min-width: 140px;
    }

    &_lg {
      min-width: 200px;
    }
  }

  &__common-btn {
    margin: 10px;
  }
}
</style>
