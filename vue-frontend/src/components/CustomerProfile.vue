<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Welcome to your dashboard!</div>
    </md-card-header>

    <md-card-content>
      <div id="Profile">
        <h3>CUIT:<span>{{customer.cuit}}</span></h3>
        <template v-if="isEditingProfile">
          <div style="width:100%;">
            <label for='nombre'>Nombre</label>
            <input id='nombre' v-model="customer.name" type="text" />
          </div>
          <div style="width:100%;">
            <label for='apellido'>Apellido</label>
            <input id='apellido' v-model="customer.surname" type="text" />
          </div>
          <div style="width:100%;">
            <label for='email'>Email</label>
            <input id='email' v-model="customer.email" type="email" />
          </div>
          <div style="width:100%;">
            <label for='phonearea'>Codigo de Area</label>
            <input id='phonearea' v-model="customer.phone.area" type="number" />
          </div>
          <div style="width:100%;">
            <label for='phone'>Telefono</label>
            <input id='phone' v-model="customer.phone.number" type="number" />
          </div>
        </template>

        <template v-else>
          <p>Nombre:
            <span>{{customer.name}}</span>
          </p>
          <p>Apellido:
            <span>{{customer.surname}}</span>
          </p>
          <p>Email:
            <span>{{customer.email}}</span>
          </p>
          <p>Phone Area:
            <span>{{customer.phone.area}}</span>
          </p>
          <p>Phone:
            <span>{{customer.phone.number}}</span>
          </p>
        </template>

        <div>
          <button v-if="!isEditingProfile" v-on:click="editProfile">Editar</button>
          <button v-if="isEditingProfile" v-on:click="cancelEditProfile">Cancelar</button>
          <button v-if="isEditingProfile" v-on:click="saveProfile">Grabar</button>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { registerCustomer } from './../services/customer-service'

export default{
  name: 'Profile',
  data () {
    return {
      oldCustomer: {},
      customer: {
        cuit: '',
        name: '',
        surname: '',
        email: '',
        phone: {
          area: '',
          number: ''
        }
      },
      isEditingProfile: false
    }
  },

  methods: {
    editProfile: function () {
      // truco para copiar el usuario y que no sea una referencia al mismo objeto
      this.oldCustomer = JSON.parse(JSON.stringify(this.customer))
      this.isEditingProfile = true
    },
    saveProfile: function () {
      this.isEditingProfile = false
      console.log('name: ' + this.customer.name)
      console.log('surname: ' + this.customer.surname)
      console.log('email: ' + this.customer.email)
      console.log('phone: ' + this.customer.phone)

      registerCustomer(customer)
        .then((response) => {
          if (response.success) {
            this.$emit('registered', response)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      this.close()
      // this.$http
      // .post(this.rootUrl + '/user/save', this.customer)
      // .then((result) => {
      //   alert('saved')
      // })
      // .catch((err) => {
      //   alert(JSON.stringify(err))
      // })
    },
    cancelEditProfile: function () {
      this.customer = this.oldCustomer
      this.isEditingProfile = false
    }
  }
}
</script>
