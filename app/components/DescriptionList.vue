<template>
  <section :class="b()">
    <div :class="b(classes.column)">
      <div
        v-for="content of contentList"
        :key="content.uuidv4"
        :class="b(classes.content)"
      >
        <h2
          v-if="content.title"
          :class="b(classes.title)"
        >
          {{ content.title }}
        </h2>
        <p
          v-if="content.description"
          :class="b(classes.lead)"
        >
          {{ content.description }}
        </p>
        <ul
          v-if="content.attributes"
          :class="b(classes.list)"
        >
          <li
            v-for="item of content.attributes"
            :key="item"
            :class="b(classes.listItem)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
const CONTENT_LIST = 'content-list'

export default {
  name: 'DescriptionList',
  props: {
    [CONTENT_LIST]: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      classes: {
        column: 'column',
        content: 'content',
        title: 'title',
        lead: 'lead',
        list: 'list',
        listItem: 'list-item'
      }
    }
  }
}
</script>

<style lang="scss">
.DescriptionList {
  background: $background-gradient;

  &__column {
    padding-top: 20px;
    padding-left: 12vw;
    padding-right: 12vw;
  }

  &__title {
    font-size: $md-font;
    color: $grey-darker;

    @include mobile {
      font-size: $sm-font;
    }
  }

  &__lead, &__list {
    padding: 20px;
    font-size: $sm-font;
    font-weight: 300;
    color: $white;
  }

  &__list-item {
    list-style-type: square;
  }
}
</style>
