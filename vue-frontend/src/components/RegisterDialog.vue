<template>
  <md-dialog md-open-from="#register" md-close-to="#register" ref="dialog">
    <md-dialog-content>
      <md-tabs md-fixed md-elevation="4" class="md-transparent">
        <md-tab id="customer" md-label="Customer">
          <md-layout md-align="center">
            <md-input-container>
              <label>Nombre</label>
              <md-input v-model="name" placeholder="Nombre"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Apellido</label>
              <md-input v-model="surname" placeholder="Apellido"></md-input>
            </md-input-container>

            <md-input-container>
              <label>E-Mail</label>
              <md-input v-model="email" type="email" placeholder="E-Mail"></md-input>
            </md-input-container>

            <md-input-container md-has-password>
              <label>Password</label>
              <md-input v-model="password" type="password" placeholder="Password"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Phone</label>
              <md-input v-model="phone" placeholder="Phone"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Address</label>
              <md-input placeholder="Address"></md-input>
            </md-input-container>

            <md-input-container>
              <label>CUIT</label>
              <md-input v-model="cuit" placeholder="CUIT"></md-input>
            </md-input-container>

            <md-button class="md-raised" @click="apply()">Aceptar</md-button>
            <md-button class="md-raised" @click="close()">Cancelar</md-button>

          </md-layout>
        </md-tab>

        <md-tab id="provider" md-label="Provider">
          <md-layout md-align="center">
            <md-input-container>
              <label>Nombre</label>
              <md-input v-model="name" placeholder="Nombre"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Apellido</label>
              <md-input v-model="surname" placeholder="Apellido"></md-input>
            </md-input-container>

            <md-input-container>
              <label>E-Mail</label>
              <md-input v-model="email" type="email" placeholder="E-Mail"></md-input>
            </md-input-container>

            <md-input-container md-has-password>
              <label>Password</label>
              <md-input v-model="password" type="password" placeholder="Password"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Phone</label>
              <md-input v-model="phone" placeholder="Phone"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Address</label>
              <md-input placeholder="Address"></md-input>
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
  name: 'register-dialog',
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      phone: 0,
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
    apply: function () {
      console.log('name: ' + this.name)
      console.log('surname: ' + this.surname)
      console.log('email: ' + this.email)
      console.log('password: ' + this.password)
      console.log('phone: ' + this.phone)
      console.log('cuit: ' + this.cuit)
      this.close()
    }
  }
}
</script>
