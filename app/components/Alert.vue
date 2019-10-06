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
@debug lighten($primary, 10%);

.Alert {
  display: flex;
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;

  &_variant-primary {
    color: lighten($primary, 40%);
    background-color: $primary;
    border-color: darken($primary, 10%);

    a {
      color: darken($primary, 50%);
    }
  }

  &_variant-secondary {
    color: lighten($background, 40%);
    background-color: $background;
    border-color: lighten($background, 10%);

    a {
      color: darken($background, 45%);
    }
  }

  &_variant-success {
    color: lighten($success, 40%);
    background-color: $success;
    border-color: lighten($success, 10%);

    a {
      color: darken($success, 45%);
    }
  }

  &_variant-danger {
    color: lighten($danger, 40%);
    background-color: $danger;
    border-color: lighten($danger, 10%);

    a {
      color: darken($danger, 45%);
    }
  }

  &_variant-warning {
    color: lighten($warning, 40%);
    background-color: $warning;
    border-color: lighten($warning, 10%);

    a {
      color: darken($warning, 45%);
    }
  }

  &_variant-dark {
    color: lighten($grey-darker, 40%);
    background-color: $grey-darker;
    border-color: lighten($grey-darker, 10%);

    a {
      color: darken($grey-darker, 45%);
    }
  }
}
</style>
