<template>
  <div :class="b()">
    <div :class="b('row')">
      <div :class="b('column', { sm: true })">
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          @click="$emit('deploy')"
        >
          DEPLOY
        </Button>
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          @click="$emit('compile')"
        >
          COMPILE
        </Button>
        <Button
          sm
          block
          :variant="types.warning"
          :class="b('common-btn')"
          @click="$emit('structure')"
        >
          STRUCTURE
        </Button>
      </div>
      <div :class="b('column', { lg: true })">
        <StructureBuilder
          v-if="structure"
          :structure="structure.contract_info"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TYPES from '../../static/types.json'

import Button from '../../components/Button'
import StructureBuilder from './StructureBuilder'

export default {
  name: 'Actions',
  components: {
    Button,
    StructureBuilder
  },
  props: {
    structure: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      types: TYPES
    }
  }
}
</script>

<style lang="scss">
.Actions {
  background-color: $grey-darkest;
  height: 85vh;
  min-width: 50vw;
  max-width: 100vw;

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__column {
    padding: 10px;

    &_sm {
      min-width: 140px;
    }

    &_lg {
      min-width: 200px;
    }
  }

  &__common-btn {
    margin: 10px;
  }
}
</style>
