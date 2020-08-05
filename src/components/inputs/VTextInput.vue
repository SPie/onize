<template>
  <div>
    <label :for="identifier">{{ label }}</label>
    <input
      :type="type"
      :id="identifier"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <div v-for="(errorMessage, index) in errorMessages" :key="index">{{ $t(errorMessage) }}</div>
  </div>
</template>

<script>
export default {
  name: 'VTextInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    identifier: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: String
    },
    errorMessages: {
      type: Array
    }
  }
}
</script>