<template>
  <div>
    <input
      id="input"
      :class="b()"
      :type="type"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :value="value"
      @input="change"
    >
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    change (event) {
      this.$emit('input', Number(event.target.value))
    }
  }
}
</script>

<style lang="scss">
.Input {
  display: block;
  margin: 0;
  padding: 0.8rem 1.6rem;
  // background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: $sm-font;
  border-color: $primary;
  border-width: 1px;
  border-radius: 0.4rem;

  @include transition(box-shadow 300ms);

  &::placeholder {
    color: $grey-darker;
  }

  &:focus {
    outline: none;
    // @include box-shadow(0 0.3rem 2rem rgba(82, 196, 196, 0.233));
  }
}
</style>
