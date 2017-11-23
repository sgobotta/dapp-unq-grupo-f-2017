<template>
  <md-dialog md-open-from="#login" md-close-to="#login" ref="dialog">
    <md-dialog-content>
        <md-layout md-align="center">

          <md-input-container>
            <label>E-Mail</label>
            <md-input v-model="email" placeholder="E-Mail"></md-input>
          </md-input-container>

          <md-input-container md-has-password>
            <label>Apellido</label>
            <md-input v-model="password" type="password" placeholder="Password"></md-input>
          </md-input-container>

          <md-button class="md-raised" @click="apply()">Aceptar</md-button>
          <md-button class="md-raised" @click="close()">Cancelar</md-button>

        </md-layout>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
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
    apply: function () {
      console.log('email: ' + this.email)
      console.log('password: ' + this.password)
      this.close()
    }
  }
}
</script>
