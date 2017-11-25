<template>
  <md-dialog md-open-from="#register" md-close-to="#register" ref="dialog">
    <md-dialog-content>
      <md-tabs md-fixed md-elevation="4" class="md-transparent">
        <md-tab id="customer" md-label="Customer">
          <md-layout md-align="center">
            <md-stepper>
              <md-step md-label="Personal Information" :md-continue="validStep1" :md-error="!validStep1">
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="name" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="surname" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>E-Mail</label>
                  <md-input v-model="email" type="email" required></md-input>
                </md-input-container>

                <md-input-container md-has-password>
                  <label>Password</label>
                  <md-input v-model="password" type="password" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone area</label>
                  <md-input v-model="phonearea" type="number" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone</label>
                  <md-input v-model="phone" type="number" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>CUIT</label>
                  <md-input v-model="cuit" required></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Address" :md-disabled="!validStep1">
                <md-input-container>
                  <label>Address</label>
                  <md-input required></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Verify Information" :md-disabled="!validStep1">
                <h2>Verifique la información provista</h2>
                </br>
                <h3>Nombre y apellido</h3>
                <p>{{name + ' ' + surname}}</p>
                </br>
                <h3>E-Mail</h3>
                <p>{{email}}</p>
                </br>
                <h3>Phone</h3>
                <p>{{phonearea + ' ' + phone}}</p>
                </br>
                <h3>CUIT</h3>
                <p>{{cuit}}</p>
                </br>
                <md-button class="md-raised md-primary" @click="apply()">Aceptar</md-button>
                <md-button class="md-raised md-primary" @click="close()">Cancelar</md-button>

              </md-step>
            </md-stepper>
          </md-layout>
        </md-tab>

        <md-tab id="provider" md-label="Provider">
          <md-layout md-align="center">
            <md-stepper>
              <md-step md-label="Personal Information" :md-continue="validStep1" :md-error="!validStep1">
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="name" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="surname" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>E-Mail</label>
                  <md-input v-model="email" type="email" required></md-input>
                </md-input-container>

                <md-input-container md-has-password>
                  <label>Password</label>
                  <md-input v-model="password" type="password" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone area</label>
                  <md-input v-model="phonearea" type="number" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone</label>
                  <md-input v-model="phone" type="number" required></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Address" :md-disabled="!validStep1">
                <md-input-container>
                  <label>Address</label>
                  <md-input required></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Verify Information" :md-disabled="!validStep1">
                <h2>Verifique la información provista</h2>
                </br>
                <h3>Nombre y apellido</h3>
                <p>{{name + ' ' + surname}}</p>
                </br>
                <h3>E-Mail</h3>
                <p>{{email}}</p>
                </br>
                <h3>Phone</h3>
                <p>{{phonearea + ' ' + phone}}</p>
                </br>
                <h3>CUIT</h3>
                <p>{{cuit}}</p>
                </br>
                <md-button class="md-raised md-primary" @click="apply()">Aceptar</md-button>
                <md-button class="md-raised md-primary" @click="close()">Cancelar</md-button>
              </md-step>
            </md-stepper>
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
      phonearea: '',
      phone: '',
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
  },
  computed: {
    validPhone: function () {
      const regex = /^\d+$/

      return regex.test(this.phone) && regex.test(this.phonearea)
    },
    validStep1: function () {
      return this.step1FieldsCompleted && this.validPhone
    },
    step1FieldsCompleted: function () {
      return this.name && this.surname && this.email && this.password && this.phone && this.phonearea && this.cuit
    }
  }
}
</script>
