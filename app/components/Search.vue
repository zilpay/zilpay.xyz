<template>
  <div>
    <div
      :class="b()"
    >
      <input
        type="search"
        :class="b('search')"
        :value="value"
        @input="onInput"
        @change="onClick"
      >
      <img
        src="/icons/search-icon.svg"
        height="40"
        :class="b('icon')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onInput (event) {
      const { value } = event.target
      this.$emit('input', value)
    },
    onClick () {
      this.$emit('click')
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss">
.Search {
  display: flex;
  align-items: center;

  background: $primary;

  height: 50px;
  max-width: 500px;

  padding: 5px;

  box-sizing: border-box;
  border-radius: 25px;

  @include transition(all .5s);

  &__search {
    background: $primary;
    width: 100%;;
    height: 42.5px;
    line-height: 30px;
    font-size: $md-font;
    outline: 0;
    border: 0;
    border-radius: 20px;
    padding: 0 20px;
    color: $background;
  }

  &__icon {
    cursor: pointer;

    padding: 8px;

    @include transition(all .5s);

    &:hover {
      background-color: $primary - 30;
      border-radius: 20px;
    }
  }
}
</style>
