import Vue from 'vue'

import VTextInput from '@/components/inputs/VTextInput'
import Checkbox from '@/components/inputs/Checkbox'
import SelectBox from '@/components/inputs/SelectBox'

const componentRegistry = () => {
  Vue.component('VTextInput', VTextInput)
  Vue.component('Checkbox', Checkbox)
  Vue.component('SelectBox', SelectBox)
}


export {componentRegistry}