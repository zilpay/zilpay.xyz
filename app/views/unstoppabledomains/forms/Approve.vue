<template>
  <div>
    <form :class="b()" @submit.prevent="submit">
      <Input
        :value="domainName"
        :variant="types.primary"
        :class="b('form-input')"
        disabled
        label="Domain"
        md
        block
      />
      <Input
        v-model="owner"
        placeholder="ZIL address"
        :variant="types.primary"
        :error="errorAddress"
        :class="b('form-input')"
        label="Approved address"
        md
        block
        @input="errorAddress = null"
      />
      <Button
        :variant="types.warning"
        :class="b('transfer-btn')"
        md
      >
        Approve
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
  name: 'Approve',
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
      types: TYPES,
      errorAddress: null
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
      try {
        this.validateAddreas(this.owner)
      } catch (err) {
        this.errorAddress = 'Owner is must be ZIL address'
        return null
      }
      this.$emit('approve', {
        node: this.udDomainToHash(this.domain),
        owner: this.owner
      })
    }
  }
}
</script>

<style lang="scss">
.Approve {
  text-align: left;

  &__form-input {
    margin-top: 10px;
  }

  &__transfer-btn {
    margin-top: 20px;
  }
}
</style>
