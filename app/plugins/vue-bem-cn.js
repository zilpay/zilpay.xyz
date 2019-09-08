import Vue from 'vue'
import vueBemCn from 'vue-bem-cn'

const bemConfig = {
  delimiters: {
    ns: '', // namespace
    el: '__', // element delimeter
    mod: '_', // modifier delimeter
    modVal: '-' // value delimeter for modifier
  }
}

Vue.use(vueBemCn, bemConfig)
