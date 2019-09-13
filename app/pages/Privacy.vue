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

import SimpleHeader from '../components/SimpleHeader'
import DescriptionList from '../components/DescriptionList'
import Footer from '../views/home/Footer'

import PrivacyPolicyData from '../static/privacy-data.json'

const list = PrivacyPolicyData.list.map(el => ({
  ...el,
  uuidv4: uuidv4()
}))

export default {
  name: 'Privacy',
  components: {
    SimpleHeader,
    DescriptionList,
    Footer
  },
  data () {
    return {
      list,
      header: {
        title: PrivacyPolicyData.title,
        subTitle: PrivacyPolicyData.subTitle
      }
    }
  }
}
</script>

<style lang="scss">
</style>
