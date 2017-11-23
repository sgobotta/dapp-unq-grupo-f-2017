<template>
  <md-dialog md-open-from="#login" md-close-to="#login" ref="dialog">
    <md-dialog-content>
      <md-tabs md-fixed md-elevation="4" class="md-transparent">
        <md-tab id="customer" md-label="Customer">
          <md-layout md-align="center">

            <md-input-container>
              <label>CUIT</label>
              <md-input v-model="cuit" placeholder="CUIT"></md-input>
            </md-input-container>

            <md-input-container md-has-password>
              <label>Apellido</label>
              <md-input v-model="password" type="password" placeholder="Password"></md-input>
            </md-input-container>

            <md-button class="md-raised" @click="apply()">Aceptar</md-button>
            <md-button class="md-raised" @click="close()">Cancelar</md-button>

          </md-layout>
        </md-tab>

        <md-tab id="provider" md-label="Provider">
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
        </md-tab>
      </md-tabs>
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
