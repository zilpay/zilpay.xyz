<template>
  <div :class="b()">
    <div :class="b('container')">
      <Jumbotron>
        <Alert :variant="types.danger">
          This
          <a
            href="http://"
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
          contract Balance: 9947.44534 ZIL
        </Alert>
        <div
          :class="b('rol-value')"
        >
          {{ range }}
        </div>
        <Range
          v-model="range"
          :max="99"
          :min="1"
          :class="b('range')"
        />
        <div
          :class="b('win-row')"
        >
          <div
            :class="b('win-amount')"
          >
            WIN AMOUNT: {{ range * 2 }}
          </div>
          <Input />
        </div>
        <Button
          :class="b('button')"
        >
          Bet
        </Button>
      </Jumbotron>
    </div>
  </div>
</template>

<script>
import Jumbotron from '../../components/Jumbotron'
import Alert, { TYPES } from '../../components/Alert'
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
      range: 50
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

  &__button {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
