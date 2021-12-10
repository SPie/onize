<template>
  <div v-if="project">
    <h1>Project {{ project.label }}</h1>
    <div>
      <p>{{ project.description }}</p>
    </div>
  </div>
</template>

<script>
import { getProject } from '@/api/projects'

export default {
  name: 'ShowProject',
  data () {
    return {
      project: null
    }
  },
  mounted() {
    this.getProject(this.$route.params.project)
  },
  methods: {
    getProject: function (uuid) {
      getProject(uuid)
        .then(response => this.project = response.data.project)
        .catch()
    }
  }
}
</script>