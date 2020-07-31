<template>
    <div>

        <h1>Register</h1>

        <div>
            <form>

                <div>
                    <label for="email">E-Mail</label>
                    <input id="email" type="email" v-model="email" />
                </div>

                <div>
                    <label for="password">Password</label>
                    <input id="password" type="password" v-model="password" />
                </div>

                <div>
                    <label for="passwordConfirm">Confirm Password</label>
                    <input id="passwordConfirm" type="password" v-model="passwordConfirm" />
                </div>

                <div>
                    <button type="button" :disabled="isEmpty" @click="register">Register</button>
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
      passwordConfirm: ''
    }
  },
  computed: {
    isEmpty () {
      return !this.email || !this.password || !this.passwordConfirm
    }
  },
  methods: {
    register () {
      register(this.email, this.password)
        .then(() => {console.log('DONE')})
        .catch((error) => {console.log(error)})
    }
  }
}
</script>