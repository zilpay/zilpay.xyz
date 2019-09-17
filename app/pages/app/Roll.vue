<template>
  <div :class="b()">
    <div :class="b('container')">
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
          <Input v-model="betAmount" :variant="types.warning" />
        </div>
        <Button
          :class="b('button')"
          @click="roll"
        >
          Bet
        </Button>
      </Jumbotron>
    </div>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Jumbotron from '../../components/Jumbotron'
import Alert from '../../components/Alert'
import Range from '../../components/Range'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default {
  name: 'Roll',
  components: {
    Jumbotron,
    Alert,
    Range,
    Input,
    Button
  },
  data () {
    return {
      types: TYPES,
      range: 50,
      rangeMax: 99,
      rangeMin: 1,
      balance: 0,
      betAmount: 100,
      contractAddress: '0xE8A997e359AC2A1e891dBDf7fc7558623bB0eaD2'
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
      await this.getState()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getState () {
      if (process.client) {
        const { contracts, utils } = window.zilPay
        const contract = contracts.at(this.contractAddress)
        const state = await contract.getState()
        this.balance = utils.units.fromQa(
          new utils.BN(state._balance), 'zil'
        )
      }
    },
    async roll () {
      if (!process.client) {
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
      await contract.call(
        'Roll', [{
          vname: 'rol',
          type: 'Uint128',
          value: this.range
        }],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(9000)
        }
      )
      // console.log(tx)
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
}
</style>
