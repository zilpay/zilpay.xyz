<template>
  <div>
    <form :class="b()" @submit.prevent="submit">
      <Input
        :value="domainName"
        :variant="types.warning"
        :class="b('form-input')"
        label="Domain"
        disabled
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
        :class="b('transfer-btn')"
        md
        @click="submit"
      >
        Transfer
      </Button>
    </form>
  </div>
</template>

<script>
import TYPES from '../../../static/types.json'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import UDMixin from '../../../mixins/ud'

export default {
  name: 'Transfer',
  components: {
    Input,
    Button
  },
  mixins: [UDMixin],
  props: {
    domain: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      owner: null,
      types: TYPES
    }
  },
  computed: {
    domainName () {
      return this.domainValidate(this.domain)
    }
  },
  mounted () {
    this.node = this.domain
  },
  methods: {
    submit () {
      this.$emit('submit', {
        node: this.udDomainToHash(this.domain),
        owner: this.owner
      })
    }
  }
}
</script>

<style lang="scss">
.Transfer {
  text-align: left;

  &__form-input {
    margin-top: 10px;
  }

  &__transfer-btn {
    margin-top: 20px;
  }
}
</style>
