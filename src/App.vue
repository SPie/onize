<template>
    <component :is="layout" />
</template>

<script>
import GuestLayout from '@/components/layouts/GuestLayout'
import MemberLayout from '@/components/layouts/MemberLayout'

export default {
  name: 'App',
  components: {
    'member-layout': MemberLayout,
    'guest-layout': GuestLayout
  },
  computed: {
    layout () {
      return 'guest-layout'
    }
  }
}
</script>