<template>
  <md-dialog md-open-from="#login" md-close-to="#login" ref="dialog">
    <md-dialog-content>
      <md-layout md-align="center">

        <md-input-container>
          <label>Email</label>
          <md-input v-model="email" type="email"></md-input>
        </md-input-container>

        <md-input-container md-has-password>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-input-container>

        <md-button class="md-raised" @click="applyUser()">Aceptar</md-button>
        <md-button class="md-raised" @click="close()">Cancelar</md-button>

      </md-layout>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import { loginService } from './../services/user-service'

export default {
  name: 'login-dialog',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    open: function () {
      this.$refs['dialog'].open()
    },
    close: function () {
      this.$refs['dialog'].close()
    },
    applyUser: function () {
      loginService({ email: this.email, password: this.password })
        .then((response) => {
          if (response.success) {
            this.$emit('login', response)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      this.close()
    }
  }
}
</script>
