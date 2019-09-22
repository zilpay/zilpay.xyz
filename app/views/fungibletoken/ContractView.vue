<template>
  <div>
    <Jumbotron :class="b()">
      <Button
        md
        block
        :class="b('form-button')"
        @click="back"
      >
        Back
      </Button>
      <tree-view
        :data="state"
      />
    </Jumbotron>
  </div>
</template>

<script>
import Jumbotron from '../../components/Jumbotron'
import Button from '../../components/Button'

export default {
  name: 'ContractView',
  components: {
    Jumbotron,
    Button
  },
  props: {
    state: {
      type: Object,
      required: true
    }
  },
  methods: {
    back () {
      this.$emit('clear', null)
    }
  }
}
</script>

<style lang="scss">
.ContractView {
  min-width: 400px;

  &__form-button {
    margin-bottom: 20px;
  }
}
.tree-view-item-key {
  color: $primary;
}
.tree-view-item-value {
  color: $warning;
}
</style>
