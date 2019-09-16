<template>
  <div>
    <input
      type="range"
      :class="b()"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="change"
    >
  </div>
</template>

<script>
export default {
  name: 'Range',
  props: {
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
.Range {
  display: block;
  -webkit-appearance: none;
  background-color: $primary;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  margin: 0 auto;
  outline: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: $primary;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid $white;
    cursor: pointer;
    transition: .3s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background-color: $white;
    border: 2px solid $primary;
  }

  &::-webkit-slider-thumb:active {
    transform: scale(1.6);
  }
}
</style>
