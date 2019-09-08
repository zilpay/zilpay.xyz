<template>
  <div>
    <div :class="b()" @click="cardClick">
      <div :class="b('caption')">
        <div :class="b('caption-content')">
          <slot />
        </div>
      </div>
      <img :src="src" :class="b('fluid')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReduceCard',
  props: {
    src: {
      type: String,
      default: null
    }
  },
  methods: {
    cardClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.ReduceCard {
  display: block;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .ReduceCard__fluid {
      @include clip-path(inset(2rem));
    }
    .ReduceCard__caption {
      background-color: fade-out($primary, 0.1);

      @include clip-path(inset(2rem));
    }
  }

  &__fluid {
    max-width: 100%;
    height: auto;

    vertical-align: middle;
    border-style: none;

    @include clip-path(inset(-1px));
  }

  &__caption {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: rgba(33,37,41,.2);
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;

    @include clip-path(inset(0));
  }

  &__caption-content {
    color: $white;

    margin: auto 2rem 2rem;
    margin-left: 5rem;
    margin-right: 5rem;
    margin-bottom: 5rem;

    @include transition(opacity .25s);
  }
}
</style>
