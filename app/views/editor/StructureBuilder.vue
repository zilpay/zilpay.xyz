<template>
  <div :class="b()">
    <div :class="b('container')">
      <h3 :class="b('title')">
        scilla_version:
        <span :class="b('value')">
          {{ structure.scilla_major_version }}
        </span>
      </h3>
      <h3 :class="b('title')">
        contract:
        <span :class="b('value')">
          {{ structure.vname }}
        </span>
      </h3>
      <div :class="b('connector')">
        <Input
          v-model="address"
          sm
          block
          placeholder="Enter contract address."
          :variant="types.warning"
        />
      </div>
      <div :class="b('transitions')">
        <div
          v-for="transition of transitions"
          :key="transition.uuid"
          :class="b('transition')"
        >
          <Button
            sm
            block
            :disabled="address.length < 42"
            :class="b('transition-btn')"
          >
            {{ transition.vname }}
          </Button>
          <Input
            sm
            block
            placeholder="Params comma separated."
            :class="b('transition-params')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuidv4'

import TYPES from '../../static/types.json'

import Button from '../../components/Button'
import Input from '../../components/Input'

export default {
  name: 'StructureBuilder',
  components: {
    Button,
    Input
  },
  props: {
    structure: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      types: TYPES,
      address: ''
    }
  },
  computed: {
    transitions () {
      return this
        .structure
        .transitions
        .map(el => ({
          ...el,
          uuid: uuidv4()
        }))
    }
  }
}
</script>

<style lang="scss">
.StructureBuilder {

  &__title {
    display: flex;
  }

  &__value {
    color: $primary;
    margin-left: 5px;
  }

  &__transitions {
    margin-top: 20px;
  }

  &__transition {
    margin-top: 5px;
    display: flex;
  }

  &__transition-params {
    margin-left: 3px;
  }
}
</style>
