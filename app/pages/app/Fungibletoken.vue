<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('row')">
        <Jumbotron :class="b('column')">
          <Alert :variant="types.info">
            This smart contract made for fun, do not use in production!!!
          </Alert>
        </Jumbotron>
        <Jumbotron :class="b('column')">
          <Alert :variant="types.info">
            This smart contract made for fun, do not use in production!!!
          </Alert>
        </Jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Jumbotron from '../../components/Jumbotron'
import Alert from '../../components/Alert'

export default {
  name: 'Fungibletoken',
  components: {
    Jumbotron,
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
$indentation: 100vw - 100;

.Fungibletoken {
  background-color: $background;
  height: 100vh;

  &__container {
    padding-top: 14vh;
    padding-left: $indentation;
    padding-right: $indentation;
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
  }

  &__column {
    margin-top: 30px;;
  }
}
</style>
