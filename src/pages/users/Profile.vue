<template>
    <div>
        <h1>{{ $t('profile') }}</h1>
        <div v-if="user">
            <div v-if="!edit">
                <div>{{ user.email }}</div>
                <button type="button" @click="toggle">{{ $t('button.edit') }}</button>
            </div>
            <div v-if="edit">
                <form>
                    <VTextInput
                        type="email"
                        identifier="email"
                        :label="$t('label.email')"
                        v-model="newEmail"
                        :errorMessages="newEmailErrors"
                    />
                    <button type="button" @click="save">{{ $t('button.save') }}</button>
                    <button type="button" @click="cancel">{{ $t('button.cancel') }}</button>
                </form>
            </div>
            <div>
                <button type="button" @click="toggleChangePassword">{{ $t('button.changePassword') }}</button>
            </div>
            <div v-if="changePassword">
                <form>
                    <VTextInput
                        type="password"
                        identifier="password"
                        :label="$t('label.password')"
                        v-model="newPassword"
                        :error-messages="newPasswordErrors"
                    />
                    <VTextInput
                        type="password"
                        identifier="passwordConfirm"
                        :label="$t('label.passwordConfirm')"
                        v-model="newPasswordConfirm"
                        :error-messages="newPasswordConfirmErrors"
                    />
                    <button type="button" @click="savePassword">{{ $t('button.save') }}</button>
                    <button type="button" @click="cancelPassword">{{ $t('button.cancel') }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {authenticated} from '@/api/auth'
import {update, updatePassword} from '@/api/users'

export default {
  name: 'Profile',
  data () {
    return {
      user: null,
      edit: false,
      changePassword: false,
      newEmail: null,
      newEmailErrors: [],
      newPassword: null,
      newPasswordErrors: [],
      newPasswordConfirm: null,
      newPasswordConfirmErrors: []
    }
  },
  mounted() {
    authenticated().then((response) => {
      this.user = response.data.user
      this.newEmail = this.user.email
    })
  },
  methods: {
    toggle () {
      this.edit = true
    },
    save () {
      this.newEmailErrors = []

      update(this.newEmail)
        .then((response) => {
          this.user = response.data.user

          // TODO flash message

          this.edit = false
        })
        .catch((error) => {
          // TODO flash message

          if (error.response.status === 422) {
            if (typeof error.response.data.errors.email !== 'undefined') {
              this.newEmailErrors = error.response.data.errors.email
            }
          }
        })
    },
    cancel () {
      this.newEmail = this.user.email
      this.edit = false
    },
    toggleChangePassword () {
      this.changePassword  = true
    },
    savePassword () {
      this.newPasswordErrors = []
      this.newPasswordConfirmErrors = []

      if (this.newPassword !== this.newPasswordConfirm) {
        this.newPasswordConfirmErrors = ['validation.password_matching']
        this.newPassword = null
        this.newPasswordConfirm = null
        return
      }

      updatePassword(this.newPassword)
        .then((response) => {
          this.user = response.data.user

          // TODO flash message

          this.changePassword = false
        })
        .catch((error) => {
          // TODO flash message

          if (error.response.status === 422) {
            if (typeof error.response.data.errors.password !== 'undefined') {
              this.newPasswordErrors = error.response.data.errors.password
            }
          }
        })

      this.newPassword = null
      this.newPasswordConfirm = null
    },
    cancelPassword () {
      this.newPassword = null
      this.changePassword = false
    }
  }
}
</script>