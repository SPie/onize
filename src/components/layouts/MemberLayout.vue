<template>
    <div>
        <div>
            {{ user.email }}
            <router-link :to="{name: 'Profile'}">{{ $t('profile') }}</router-link>
            <button @click="logout">{{ $t('logout') }}</button>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import {logout} from '@/api/auth'

export default {
  name: 'MemberLayout',
  data () {
    return {
      user: null
    }
  },
  created: function () {
    this.user = this.$store.getters.authenticatedUser
  },
  methods: {
    logout () {
      this.$store.commit('setAuthenticatedUser', null)

      logout().finally(() => this.$router.push({name: 'Login'}))
    }
  }
}
</script>