import Vue from 'vue'

import VTextInput from './inputs/VTextInput'

const componentRegistry = () => {
  Vue.component('VTextInput', VTextInput)
}


export {componentRegistry}