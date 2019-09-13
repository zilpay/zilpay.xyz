<template>
  <section :class="b()">
    <div :class="b(classes.column)">
      <div
        v-for="content of contentList"
        :key="content.uuid"
        :class="b(classes.content)"
      >
        <h2 :class="b(classes.title, { gray })">
          {{ content.title }}
        </h2>
        <p :class="b(classes.lead)">
          {{ content.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DescriptionList',
  props: {
    contentList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      classes: {
        column: 'column',
        content: 'content',
        title: 'title',
        lead: 'lead',
        gray: 'gray'
      }
    }
  }
}
</script>

<style lang="scss">

</style>
