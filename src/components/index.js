import Vue from 'vue'
import ElTreeTransfer from './ElTreeTransfer.vue'
import '../assets/css/index.scss'

const Components = {
  ElTreeTransfer
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
