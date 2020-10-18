<template>
  <div>

    <h1>{{ $t('register' )}}</h1>

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
        <VTextInput
          type="password"
          identifier="password-confirm"
          :label="$t('passwordConfirm')"
          v-model="passwordConfirm"
          :errorMessages="passwordConfirmErrors"
        />

        <div>
          <button type="button" :disabled="isEmpty" @click="register">{{ $t('register') }}</button>
        </div>

      </form>
    </div>

  </div>
</template>

<script>
import { register } from '@/api/users'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      emailErrors: [],
      passwordErrors: [],
      passwordConfirmErrors: []
    }
  },
  computed: {
    isEmpty () {
      return !this.email || !this.password || !this.passwordConfirm
    }
  },
  methods: {
    register () {
      this.emailErrors = []
      this.passwordErrors = []
      this.passwordConfirmErrors = []

      if (this.password !== this.passwordConfirm) {
        this.passwordConfirmErrors = ['validation.password_matching']        
        return
      }

      register(this.email, this.password)
        .then(response => {
          this.$store.commit('setAuthenticatedUser', response.data.user)

          // TODO flash message

          this.$router.push({name: 'Dashboard'})
        })
        .catch(error => {
          this.passwordConfirm = this.password = ''

          // TODO flash message

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