<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('info')">
        <div :class="b('network')">
          {{ walletState.network }}
        </div>
        <div :class="b('address')">
          {{ walletState.currentAddress }}
        </div>
      </div>
      <Jumbotron>
        <Alert :variant="types.danger">
          This
          <a
            href="https://viewblock.io/zilliqa/address/zil1az5e0c6e4s4pazgahhmlca2cvgamp6kjtaxf4q?network=testnet"
            target="_blank"
          >
            contract
          </a>
          is deployed on the dev-testnet.
          Don't send mainnet ZILs to this address!
        </Alert>
        <Alert :variant="types.warning">
          This smart contract made for fun, do not use in production!!!
        </Alert>
        <Alert>
          contract Balance: {{ balance }} ZIL
        </Alert>
        <div
          :class="b('rol-value')"
        >
          {{ range }}
        </div>
        <Range
          v-model="range"
          :max="rangeMax"
          :min="rangeMin"
          :class="b('range')"
        />
        <div
          :class="b('win-row')"
        >
          <div
            :class="b('win-amount')"
          >
            WIN AMOUNT: {{ winAmount }}
          </div>
          <Input
            v-model="betAmount"
            md
            block
            label="Your bet amount:"
            type="number"
            :max="1000000000"
            :variant="types.warning"
          />
        </div>
        <Button
          lg
          :class="b('button')"
          @click="roll"
        >
          Roll
        </Button>
      </Jumbotron>
    </div>
    <Modal
      :name="modalInstance.name"
      :title="modalInstance.title"
    >
      <div :class="b('modal-content')">
        <img
          width="300"
          :src="modalInstance.img"
          :class="b('modal-img')"
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Jumbotron from '../../components/Jumbotron'
import Alert from '../../components/Alert'
import Range from '../../components/Range'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

import ZilPayMixin from '../../mixins/zilpay'

export default {
  name: 'Roll',
  components: {
    Jumbotron,
    Alert,
    Range,
    Input,
    Button,
    Modal
  },
  mixins: [ZilPayMixin],
  data () {
    return {
      types: TYPES,
      range: 50,
      rangeMax: 99,
      rangeMin: 1,
      balance: 0,
      betAmount: 100,
      contractAddress: 'zil1az5e0c6e4s4pazgahhmlca2cvgamp6kjtaxf4q',
      needNetwork: ['testnet'],
      modalInstance: {
        title: 'ZilPay',
        name: this.$options.name,
        img: ''
      }
    }
  },
  computed: {
    winAmount () {
      return Math.round((this.rangeMax / this.range) * this.betAmount)
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      this.observable()
      await this.getState()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getState () {
      const test = this.zilPayTest()
      if (!test) {
        return null
      }
      const { contracts, utils } = window.zilPay
      const contract = contracts.at(this.contractAddress)
      const state = await contract.getState()
      this.balance = utils.units.fromQa(
        new utils.BN(state._balance), 'zil'
      )
    },
    async roll () {
      const test = this.zilPayTest()
      if (!test) {
        return null
      }
      const { contracts, utils } = window.zilPay
      const contract = contracts.at(this.contractAddress)
      const amount = utils.units.toQa(
        this.betAmount,
        utils.units.Units.Zil
      )
      const gasPrice = utils.units.toQa(
        '1000', utils.units.Units.Li
      )
      try {
        this.$nuxt.$loading.start()
        const tx = await contract.call(
          'Roll', [{
            vname: 'rol',
            type: 'Uint128',
            value: this.range.toString()
          }],
          {
            amount,
            gasPrice,
            gasLimit: utils.Long.fromNumber(9000)
          }
        )
        const interval = setInterval(() => window
          .zilPay
          .blockchain
          .getTransaction(tx.TranID)
          .then(tx => tx.receipt.event_logs[0].params)
          .then(params => params.find(el => el.vname === 'winAmount').value)
          .then(amount => this.showResult(amount))
          .then(() => this.$nuxt.$loading.finish())
          .then(() => clearInterval(interval))
          .catch(), 5000)
      } catch (err) {
        this.$nuxt.$loading.finish()
      }
    },
    showResult (value) {
      const { utils } = window.zilPay
      const amount = utils.units.fromQa(
        new utils.BN(value), 'zil'
      )

      if (Number(value) > 0) {
        this.modalInstance.title = `You win ${amount} ZIL`
        this.$modal.show(this.modalInstance.name)
      } else {
        this.modalInstance.title = `You lose ZIL`
        this.$modal.show(this.modalInstance.name)
      }
    }
  }
}
</script>

<style lang="scss">
$indentation: 100vw - 100;

.Roll {
  background-color: $background;
  height: 100vh;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 15vh;
    padding-left: $indentation;
    padding-right: $indentation;
  }

  &__info {
    width: 600px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }

  &__network, &__address {
    color: $primary;
  }

  &__range {
    padding-top: 5px;
  }

  &__rol-value {
    border-bottom: 3px dashed $grey-darker;
    color: $grey-darker;
    text-align: center;
    font-weight: bold;
    font-size: 10em;
    width: 300px;
    height: 100px;
    line-height: 60px;
    margin: 40px auto;
    letter-spacing: -.07em;
  }

  &__win-row {
    padding-top: 50px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    color: $grey-darker;
    font-weight: bold;
    font-size: $sm-font;
  }

  &__win-amount {
    color: $warning;
  }

  &__button {
    margin-top: 20px;
    text-align: center;
  }

  &__modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    height: auto;
    width: auto;
  }
}
</style>
