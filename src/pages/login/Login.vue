<template>
    <div>
        <h1>Login</h1>

        <div>
            <form>
                <VTextInput
                    type="email"
                    identifier="email"
                    :label="$t('email')"
                    v-model="email"
                    :errorMessages="emailErrors"
                />
                <VTextInput
                    type="password"
                    identifier="password"
                    :label="$t('password')"
                    v-model="password"
                    :errorMessages="passwordErrors"
                />
                <div>
                    <button type="button" :disabled="isEmpty" @click="login">{{ $t('login') }}</button>
                </div>
            </form>
        </div>

        <router-link :to="{ name: 'Register' }">Register</router-link>
    </div>
</template>

<script>
import {login, authenticated} from '@/api/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: []
    }
  },
  computed: {
    isEmpty () {
      return !this.email || !this.password
    }
  },
  methods: {
    login () {
      this.emailErrors = []
      this.passwordErrors = []

      login(this.email, this.password)
        .then(() => {
          authenticated().then(response => {
            this.$store.commit('setAuthenticatedUser', response.data.user)

            this.$router.push({name: 'Dashboard'})
          })
        })
        .catch(error => {
          this.password = ''

          if (error.response.status === 422) {
            if (typeof error.response.data.errors.email !== 'undefined') {
              this.emailErrors = error.response.data.errors.email
            }
            if (typeof error.response.data.errors.password !== 'undefined') {
              this.passwordErrors = error.response.data.errors.password
            }
          }
        })
    }
  }
}
</script>