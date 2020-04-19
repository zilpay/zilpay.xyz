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
        v-model="label"
        placeholder="Sub domain"
        :variant="types.primary"
        :error="errorLabel"
        :class="b('form-input')"
        label="Sub domain label"
        md
        block
        @input="errorLabel = null"
      />
      <Input
        v-model="owner"
        placeholder="ZIL address"
        :variant="types.primary"
        :error="errorAddress"
        :class="b('form-input')"
        label="New owner"
        md
        block
        @input="errorAddress = null"
      />
      <Button
        :variant="types.warning"
        :class="b('assign-btn')"
        md
      >
        Assign
      </Button>
    </form>
  </div>
</template>

<script>
import TYPES from '@/static/types.json'
import Input from '@/components/Input'
import Button from '@/components/Button'

import UDMixin from '@/mixins/ud'

export default {
  name: 'Assign',
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
      types: TYPES,
      label: null,
      errorAddress: null,
      errorLabel: null,
      owner: null
    }
  },
  computed: {
    domainName () {
      return this.domainValidate(this.domain)
    }
  },
  methods: {
    submit () {
      const test = /.*[a-z, 0-9]/mg

      if (!test.test(this.label) || !this.label) {
        this.errorLabel = 'Sub domain must be LowerCase, dont have [-*,.]'
        return null
      }

      try {
        this.validateAddreas(this.owner)
      } catch (err) {
        this.errorAddress = 'Owner is must be ZIL address'
        return null
      }
      this.$emit('assign', {
        node: this.udDomainToHash(this.domain),
        owner: this.owner,
        label: this.label
      })
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
