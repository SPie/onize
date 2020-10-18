<template>
    <div>
        <div>
            {{ user.email }}
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
  name: 'MemberLayout',
  data () {
    return {
      user: null
    }
  },
  created: function () {
    this.user = this.$store.getters.authenticatedUser
  }
}
</script>