<template>
  <div>
    <label :for="identifier">{{ label }}</label>
    <input type="checkbox" :id="identifier" :checked="checked" @change="$emit('check', $event.target.checked)"/>
    <div v-for="(errorMessage, index) in errorMessages" :key="index">{{ $t(errorMessage) }}</div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    identifier: {
      type: String
    },
    label: {
      type: String
    },
    checked: {
      type: Boolean
    },
    errorMessages: {
      type: Array
    }
  }
}
</script>
