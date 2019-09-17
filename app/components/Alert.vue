<template>
  <div :class="b({ variant })">
    <slot />
  </div>
</template>

<script>
import TYPES from '../static/types.json'

export default {
  name: 'Alert',
  props: {
    variant: {
      type: String,
      default: TYPES.primary
    }
  }
}
</script>

<style lang="scss">
.Alert {
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;

  &_variant-primary {
    color: $primary + 100;
    background-color: $primary;
    border-color: $primary + 30;

    a {
      color: $primary - 150;
    }
  }

  &_variant-secondary {
    color: $background + 150;
    background-color: $background;
    border-color: $background + 30;

    a {
      color: $background - 150;
    }
  }

  &_variant-success {
    color: $success + 150;
    background-color: $success;
    border-color: $success + 30;

    a {
      color: $success - 150;
    }
  }

  &_variant-danger {
    color: $danger + 150;
    background-color: $danger;
    border-color: $danger + 30;

    a {
      color: $danger - 150;
    }
  }

  &_variant-warning {
    color: $warning + 150;
    background-color: $warning;
    border-color: $warning + 30;

    a {
      color: $warning - 150;
    }
  }

  &_variant-dark {
    color: $grey-darker + 150;
    background-color: $grey-darker;
    border-color: $grey-darker + 30;

    a {
      color: $grey-darker - 150;
    }
  }
}
</style>
