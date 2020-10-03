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
      <div :class="b('method-coller')">
        <Button
          v-for="btn of actions"
          :key="btn.uuidv4"
          md
          :variant="getVariant(btn.name)"
          :class="b('call-btn')"
          @click="currentAction = btn.name"
        >
          {{ btn.name }}
        </Button>
      </div>
      <div
        v-if="!!currentForm"
        :class="b('form-call')"
      >
        <Input
          v-for="input of currentForm.inputs"
          :key="input.uuidv4"
          v-model="formActions[input.name]"
          md
          block
          :placeholder="input.placeholder"
          :variant="types.primary"
          :label="input.label"
          :type="input.type"
        />
        <Button
          md
          block
          :variant="types.warning"
          :class="b('call-form-btn')"
          @click="submit"
        >
          Call {{ currentForm.title }}
        </button>
      </div>
      <tree-view
        :data="init"
        :options="initOptions"
      />
      <tree-view
        :data="state"
        :options="stateOptions"
      />
    </Jumbotron>
  </div>
</template>

<script>
import { uuid } from 'uuidv4'

import Jumbotron from '@/components/Jumbotron'
import Button from '@/components/Button'
import Input from '@/components/Input'

import TYPES from '@/static/types.json'
import ACTIONS_METHODS from './actions.json'

const ACTIONS = [
  {
    uuidv4: uuid(),
    name: ACTIONS_METHODS.transferFrom
  },
  {
    uuidv4: uuid(),
    name: ACTIONS_METHODS.transfer
  },
  {
    uuidv4: uuid(),
    name: ACTIONS_METHODS.approve
  },
  {
    uuidv4: uuid(),
    name: ACTIONS_METHODS.allowance
  }
]
const FORMS = {
  [ACTIONS_METHODS.transferFrom]: {
    title: ACTIONS[0].name,
    variant: TYPES.success,
    inputs: [
      {
        uuidv4: uuid(),
        type: 'text',
        label: 'ByStr20',
        name: 'from',
        placeholder: 'Enter from address'
      },
      {
        uuidv4: uuid(),
        type: 'text',
        label: 'ByStr20',
        name: 'to',
        placeholder: 'Enter to address'
      },
      {
        uuidv4: uuid(),
        type: 'number',
        label: 'Uint128',
        name: 'amount',
        placeholder: 'Enter enter amount of tokens.'
      }
    ]
  },
  [ACTIONS_METHODS.transfer]: {
    title: ACTIONS[1].name,
    variant: TYPES.success,
    inputs: [
      {
        uuidv4: uuid(),
        type: 'text',
        label: 'ByStr20',
        name: 'to',
        placeholder: 'Enter to address'
      },
      {
        uuidv4: uuid(),
        type: 'number',
        label: 'Uint128',
        name: 'amount',
        placeholder: 'Enter enter amount of tokens.'
      }
    ]
  },
  [ACTIONS_METHODS.approve]: {
    title: ACTIONS[2].name,
    variant: TYPES.success,
    inputs: [
      {
        uuidv4: uuid(),
        type: 'text',
        label: 'ByStr20',
        name: 'spender',
        placeholder: 'Enter spender address'
      },
      {
        uuidv4: uuid(),
        type: 'number',
        label: 'Uint128',
        name: 'amount',
        placeholder: 'Enter enter amount of tokens.'
      }
    ]
  },
  [ACTIONS_METHODS.allowance]: {
    title: ACTIONS[3].name,
    variant: TYPES.success,
    inputs: [
      {
        uuidv4: uuid(),
        type: 'text',
        label: 'ByStr20',
        name: 'owner',
        placeholder: 'Enter tokenOwner address'
      },
      {
        uuidv4: uuid(),
        type: 'text',
        label: 'ByStr20',
        name: 'spender',
        placeholder: 'Enter spender tokens.'
      }
    ]
  }
}

export default {
  name: 'ContractView',
  components: {
    Jumbotron,
    Button,
    Input
  },
  props: {
    state: {
      type: Object,
      required: true
    },
    init: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      stateOptions: {
        rootObjectKey: 'state'
      },
      initOptions: {
        rootObjectKey: 'init'
      },
      actions: ACTIONS,
      currentAction: null,
      types: TYPES,
      formActions: {
        to: null,
        from: null,
        amount: null,
        spender: null,
        owner: null
      }
    }
  },
  computed: {
    currentForm () {
      if (!this.currentAction) {
        return null
      }
      return FORMS[this.currentAction]
    }
  },
  methods: {
    getVariant (action) {
      if (this.currentAction === action) {
        return this.types.warning
      }

      return this.types.success
    },
    back () {
      this.$emit('clear', null)
    },
    submit () {
      this.$emit('submit', {
        form: this.formActions,
        currentAction: this.currentAction
      })
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

  &__call-form-btn {
    margin-top: 20px;
  }

  &__method-coller {
    display: flex;
    padding: 10px;
  }

  &__call-btn {
    margin: 5px;
  }

  &__form-call {
    padding: 30px;
  }
}
</style>
