<template>
  <div :class="b()">
    <h1 :class="b(classes.title)">
      {{ title }}
    </h1>
    <h2 :class="b(classes.subTitle)">
      {{ subTitle }}
    </h2>
  </div>
</template>

<script>
const SUB_TITLE = 'subTitle'
const TITLE = 'title'

export default {
  name: 'SimpleHeader',
  props: {
    [TITLE]: {
      type: String,
      required: true
    },
    [SUB_TITLE]: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      classes: {
        title: 'title',
        subTitle: 'sub-title'
      }
    }
  }
}
</script>

<style lang="scss">
.SimpleHeader {
  min-height: 50vh;
  padding: 10%;
  background-color: $background;

  &__title {
    font-size: $xll-font;

    @include mobile {
      padding-top: 100px;
      font-size: $md-font;
    }
  }

  &__sub-title {
    font-size: $md-font;

    @include mobile {
      font-size: $sm-font;
    }
  }
}
</style>
