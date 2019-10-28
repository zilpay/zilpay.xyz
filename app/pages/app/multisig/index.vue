<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('row')">
        <div :class="b('column')"></div>
        <div :class="b('column')"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Multisig'
}
</script>

<style lang="scss">
.Multisig {
  width: 100vw;
  height: 100vh;
  background: $background-gradient;

  &__container {
    margin-left: auto;
    margin-right: auto;

    max-width: 960px;

    padding-top: 100px;
    padding-right: 10px;
    padding-left:  10px;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
