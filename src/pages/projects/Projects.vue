<template>
  <div>
    <h1>{{ $t('projects.projects') }}</h1>
    <ul>
      <li v-for="project in projects" :key="project.project.uuid">
        <router-link :to="{name: 'ShowProject', params: {project: project.project.uuid}}">{{ project.project.label }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {projectsList} from '@/api/projects'

export default {
  name: 'Projects',
  data () {
    return {
      projects: []
    }
  },
  mounted() {
    this.getProjects()
  },
  methods: {
    getProjects: function () {
      projectsList().then((response) => this.projects = response.data.projects)
    }
  }
}
</script>