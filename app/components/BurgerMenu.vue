<template>
  <div :class="b()" />
</template>

<script>
export default {
  name: 'BurgerMenu'
}
</script>

<style lang="scss">
.BurgerMenu {
    position: relative;
    display: inline-block;

    cursor: pointer;

    padding: 5px;

    width: 2.25em;
    height: 0.8em;

    margin-right: 0.3em;
    border-top: 0.2em solid $white;
    border-bottom: 0.2em solid $white;

    &:before {
      content: "";
      position: absolute;
      top: 0.6em;
      left: 0px;
      width: 100%;
      border-top: 0.2em solid $white;
    }
}
</style>
