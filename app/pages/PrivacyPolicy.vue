<template>
  <div :class="b()">
    <SimpleHeader :title="header.title" :sub-title="header.subTitle" />
    <DescriptionList :content-list="list" />
    <Footer />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'

import SimpleHeader from '@/components/SimpleHeader'
import DescriptionList from '@/components/DescriptionList'
import Footer from '@/views/common/Footer'

import PrivacyPolicyData from '@/static/privacy-extension.json'

const list = PrivacyPolicyData.list.map(el => ({
  ...el,
  uuidv4: uuid()
}))

export default {
  name: 'PrivacyPolicy',
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
