<template>
  <div>
    <h1>{{ $t('projects.createProject') }}</h1>

    <div>
      <form>

        <VTextInput type="text" identifier="label" :label="$t('label.label')" v-model="label" :error-messages="validationErrors.label" />
        <VTextInput type="text" identifier="description" :label="$t('label.description')" v-model="description" :error-messages="validationErrors.description" />

        <div>
          <h3>{{ $t('projects.metaDataElements') }}</h3>

          <div v-for="(metaDataElement, index) in metaDataElements" :key="index">
            <VTextInput
                type="text"
                :identifier="suffixedIdentifier('name', index)"
                :label="$t('label.name')"
                v-model="metaDataElement.name"
                :error-messages="metaDataElementsErrors(index, 'name')"
                v-on:input="nameInput($event, index)"
            />
            <VTextInput
                type="text"
                :identifier="suffixedIdentifier('label', index)"
                :label="$t('label.label')"
                v-model="metaDataElement.label"
                :error-messages="metaDataElementsErrors(index, 'label')"
                v-on:input="labelInput($event, index)"
            />
            <Checkbox
                :identifier="suffixedIdentifier('required', index)"
                :label="$t('label.required')"
                v-bind:index="index"
                :checked="metaDataElement.required"
                :error-messages="metaDataElementsErrors(index, 'required')"
                v-on:check="checkRequired($event, index)"
            />
            <Checkbox
                :identifier="suffixedIdentifier('in-list', index)"
                :label="$t('label.inList')"
                v-bind:index="index"
                :checked="metaDataElement.inList"
                :error-messages="metaDataElementsErrors(index, 'inList')"
                v-on:check="checkInList($event, index)"
            />
            <SelectBox
                :index="index"
                :identifier="suffixedIdentifier('type', index)"
                :label="$t('label.type')"
                v-model="metaDataElement.type"
                :options="types"
                :error-messages="metaDataElementsErrors(index, 'type')"
                v-on:input="typeSelect($event, index)"
            />
          </div>

          <p @click="addMetaDataElement">{{ $t('button.add') }}</p>
        </div>

        <div>
          <h3>{{ $t('projects.ownerMetaData') }}</h3>

          <div v-for="(data, index) in metaData" :key="index">
            <VTextInput
                :type="data.type"
                :identifier="suffixedIdentifier(data.name, index)"
                :label="data.label"
                v-model="data.value"
                :error-messages="metaDataErrors(index)"
            />
          </div>
        </div>

        <div>
          <button type="button" @click="create"> {{ $t('button.create') }}</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { createProject } from '@/api/projects'

export default {
  name: 'CreateProject',
  data () {
    return {
      name: '',
      label: '',
      description: '',
      validationErrors: [],
      metaDataElements: [],
      metaData: [],

      types: {
        'string': this.$t('projects.types.string'),
        'email': this.$t('projects.types.email'),
        'date': this.$t('projects.types.date'),
        'numeric': this.$t('projects.types.numeric')
      }
    }
  },
  computed: {
    suffixedIdentifier() {
      return (name, index) => name + '-' + index
    },
    metaDataElementsErrors () {
      return (index, property) => {
        return this.validationErrors['metaDataElements.' + index + '.' + property] ?? []
      }
    },
    metaDataErrors () {
      return (index) => (this.validationErrors.metaData && this.validationErrors.metaData[this.metaData[index].name]) ?? []
    }
  },
  methods: {
    addMetaDataElement: function () {
      this.metaDataElements.push({
        name: '',
        label: '',
        required: false,
        inList: true,
        type: 'string'
      })
      this.metaData.push({
        name: '',
        label: 'Label',
        value: '',
        type: 'string'
      })
    },
    checkRequired: function (checked, index) {
      this.metaDataElements[index].required = checked
    },
    checkInList: function (checked, index) {
      this.metaDataElements[index].inList = checked
    },
    nameInput: function (name, index) {
      this.metaData[index].name = name
    },
    labelInput: function (label, index) {
      this.metaData[index].label = label
    },
    typeSelect: function (type, index) {
      this.metaData[index].type = type
    },
    create: function () {
      this.validationErrors = []

      let metaData = {}
      this.metaData.forEach((element) => {
        metaData[element.name] = element.value
      })

      createProject(this.label, this.description, this.metaDataElements, metaData)
        .then((response) => {
          // TODO flash message

          this.$router.push({name: 'ShowProject', params: {project: response.project.uuid}})
        })
        .catch(error => {
          // TODO flash message

          if (error.response.status === 422) {
            this.validationErrors = error.response.data.errors
          }
        })
    }
  }
}
</script>