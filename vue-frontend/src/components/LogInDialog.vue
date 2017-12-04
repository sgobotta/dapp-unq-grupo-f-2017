<template>
  <md-dialog md-open-from="#login" md-close-to="#login" ref="dialog">
    <md-dialog-content>
      <md-tabs md-fixed md-elevation="4" class="md-transparent">
        <md-tab id="customer" md-label="Customer">
          <md-layout md-align="center">

            <md-input-container>
              <label>CUIT</label>
              <md-input v-model="cuit" type="number"></md-input>
            </md-input-container>

            <md-input-container md-has-password>
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-input-container>

            <md-button class="md-raised" @click="applyCustomer()">Aceptar</md-button>
            <md-button class="md-raised" @click="close()">Cancelar</md-button>

          </md-layout>
        </md-tab>

        <md-tab id="provider" md-label="Provider">
          <md-layout md-align="center">

            <md-input-container>
              <label>E-Mail</label>
              <md-input v-model="email"></md-input>
            </md-input-container>

            <md-input-container md-has-password>
              <label>Password</label>
              <md-input v-model="providerPassword" type="password"></md-input>
            </md-input-container>

            <md-button class="md-raised" @click="applyProvider()">Aceptar</md-button>
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
      password: '',
      providerPassword: '',
      cuit: ''
    }
  },
  methods: {
    open: function () {
      this.$refs['dialog'].open()
    },
    close: function () {
      this.$refs['dialog'].close()
    },
    applyProvider: function () {
      console.log('email: ' + this.email)
      console.log('password: ' + this.providerPassword)
      this.close()
    },
    applyCustomer: function () {
      console.log('cuit: ' + this.cuit)
      console.log('password: ' + this.password)
      this.close()
    }
  }
}
</script>
