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
      <div :class="b('transitions')">
        <Input
          v-model="params"
          sm
          block
          placeholder="Params comma separated."
          :class="b('transition-params')"
        />
        <div
          v-for="transition of transitions"
          :key="transition.uuid"
          :class="b('transition')"
        >
          <Button
            sm
            block
            :disabled="disabled"
            :class="b('transition-btn')"
            @click="call(transition)"
          >
            {{ transition.vname }}
          </Button>
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
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      types: TYPES,
      params: ''
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
  },
  methods: {
    call (transition) {
      const parse = this.params.replace(' ', '').split(',')
      const params = transition.params.map((el, index) => ({
        ...el,
        value: parse[index]
      }))
      this.$emit('transition', {
        params,
        method: transition.vname
      })
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
