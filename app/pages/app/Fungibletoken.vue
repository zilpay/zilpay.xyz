<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('row')">
        <DeployForm :class="b('column')" />
        <DeployForm :class="b('column')" />
      </div>
    </div>
  </div>
</template>

<script>
import DeployForm from '../../views/fungibletoken/FormDeploy'

export default {
  name: 'Fungibletoken',
  components: {
    DeployForm
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
    margin-top: 30px;
  }

  &__title {
    margin-bottom: 10px;
  }
}
</style>
