<template>
  <div>
    <form :class="b()" @submit.prevent="submit">
      <Input
        v-model="parent"
        :variant="types.warning"
        :class="b('form-input')"
        label="domain"
        md
        block
      />
      <Input
        v-model="label"
        :variant="types.warning"
        :class="b('form-input')"
        label="Sub domain label"
        md
        block
      />
      <Input
        v-model="owner"
        :variant="types.warning"
        :class="b('form-input')"
        label="New owner"
        md
        block
      />
      <Button
        :variant="types.warning"
        :class="b('assign-btn')"
        md
        @click="submit"
      >
        Assign
      </Button>
    </form>
  </div>
</template>

<script>
import TYPES from '../../../static/types.json'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default {
  name: 'Assign',
  components: {
    Input,
    Button
  },
  data () {
    return {
      types: TYPES,
      parent: null,
      label: null,
      owner: null
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss">
.Assign {
  text-align: left;

  &__form-input {
    margin-top: 10px;
  }

  &__assign-btn {
    margin-top: 20px;
  }
}
</style>
