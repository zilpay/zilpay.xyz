<template>
  <div :class="b()">
    <SimpleHeader
      :title="header.title"
      :sub-title="header.subTitle"
    />
    <DescriptionList
      :content-list="list"
    />
    <Footer />
  </div>
</template>

<script>
import uuidv4 from 'uuidv4'

import Footer from '../views/common/Footer'
import SimpleHeader from '../components/SimpleHeader'
import DescriptionList from '../components/DescriptionList'

import TermsData from '../static/terms.json'

const list = TermsData.list.map(el => ({
  ...el,
  uuidv4: uuidv4()
}))

export default {
  name: 'Terms',
  components: {
    SimpleHeader,
    DescriptionList,
    Footer
  },
  data () {
    return {
      list,
      header: {
        title: TermsData.title,
        subTitle: TermsData.subTitle
      }
    }
  }
}
</script>

<style lang="scss">
</style>
