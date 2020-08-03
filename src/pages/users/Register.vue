<template>
  <div>

    <h1>Register</h1>

    <div>
      <form>

        <VTextInput 
          type="email"
          identifier="email"
          label="E-Mail"
          v-model="email"
          :errorMessages="emailErrors"
        />
        <VTextInput
          type="password"
          identifier="password"
          label="Password"
          v-model="password"
          :errorMessages="passwordErrors"
        />
        <VTextInput
          type="password"
          identifier="password-confirm"
          label="Confirm Password"
          v-model="passwordConfirm"
          :errorMessages="passwordConfirmErrors"
        />

        <div>
          <button type="button" :disabled="isEmpty" @click="register">Register</button>
        </div>

      </form>
    </div>

  </div>
</template>

<script>
// import { register } from '@/api/users'

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
        this.passwordConfirmErrors = ['Passwords are not matching']        
        return
      }

      console.log('Test')
      // register(this.email, this.password)
      //   .then(() => {console.log('DONE')})
      //   .catch((error) => {console.log(error)})
    }
  }
}
</script>