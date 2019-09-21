import Vue from 'vue'
import MicroModal from 'micromodal'

Vue.prototype.$modal = {
  show: MicroModal.show,
  close: MicroModal.close
}
