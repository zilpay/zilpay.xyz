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
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          :disabled="isEnable"
          @click="$emit('init', address)"
        >
          GET INIT
        </Button>
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          :disabled="isEnable"
          @click="$emit('code', address)"
        >
          GET CODE
        </Button>
      </div>
      <div :class="b('column')">
        <Init
          v-if="structure"
          :structure="structure.contract_info"
          @deploy="$emit('deploy', $event)"
        />
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
import StructureBuilder from './StructureBuilder'
import Init from './Init'
import TYPES from '@/static/types.json'

import ZilPayMixin from '@/mixins/zilpay'

import Modal from '@/components/Modal'
import Button from '@/components/Button'
import Input from '@/components/Input'

export default {
  name: 'Actions',
  components: {
    Button,
    StructureBuilder,
    Input,
    Modal,
    Init
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
  watch: {
    address: (newValue, oldValue) => {
      if (newValue !== oldValue) {
        window.localStorage.setItem('contract', newValue)
      }
    }
  },
  mounted () {
    const contract = window.localStorage.getItem('contract')

    if (contract) {
      this.address = contract
      this.$emit('code', this.address)
    }
  },
  methods: {
    toZil (amount) {
      const { utils } = window.zilPay

      return utils.units.toQa(
        amount,
        utils.units.Units.Zil
      )
    },
    async transition (transition) {
      const { contracts, utils } = window.zilPay
      const address = this.validateAddreas(this.address)
      const contract = contracts.at(address)
      const amount = transition.amountType ? this.toZil(transition.amount) : new utils.BN(transition.amount)
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
  height: calc(100vh - 129px);
  min-width: 40vw;
  max-width: 100vw;
  padding-right: 15px;

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
