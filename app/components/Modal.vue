<template>
  <div
    :id="name"
    :class="b()"
  >
    <div
      data-micromodal-close
      :class="b('overlay')"
    >
      <div
        role="dialog"
        aria-modal="true"
        :class="b('container')"
      >
        <header :class="b('header')">
          <h2>{{ title }}</h2>
          <span
            aria-label="Close modal"
            data-micromodal-close
            :class="b('close')"
          />
        </header>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.Modal {
  display: none;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    background: $background-gradient;
    padding: 30px;
    max-width: 500px;
    max-height: 100vh;
    border-radius: 4px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  &__header {
    min-width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.25;
    box-sizing: border-box;
  }

  &__close {
    cursor: pointer;
    background: transparent;
    border: 0;
    color: $white;
  }

  &__header &__close:before {
    content: "\2715";
  }

  &.is-open {
    display: block;
  }

  &__container,
  &__overlay {
      will-change: transform;
  }
}
</style>
