<template>
  <div>
    <label for="identifier">{{ label }}</label>
    <select v-model="selected">
      <option id="identifier" v-for="(optionLabel, option) in options" :value="option" :key="option">{{ optionLabel }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectBox',
  props: {
    index: {
      type: Number
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
    options: {
      type: Object
    },
    errorMessages: {
      type: Array
    }
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>