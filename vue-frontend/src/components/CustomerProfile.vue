<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Welcome to your dashboard!</div>
    </md-card-header>

    <md-card-content>
      <div id="Profile">
        <template v-if="isEditingProfile">
          <div style="width:100%;">
            <label for='nombre'>Nombre</label>
            <input id='nombre' v-model="customerName" type="text" />
          </div>
          <div style="width:100%;">
            <label for='apellido'>Apellido</label>
            <input id='apellido' v-model="customerSurname" type="text" />
          </div>
          <div style="width:100%;">
            <label for='email'>Email</label>
            <input id='email' v-model="customerEmail" type="email" />
          </div>
          <div style="width:100%;">
            <label for='password'>Password</label>
            <input id='password' v-model="customerPassword" type="password" />
          </div>
          <div style="width:100%;">
            <label for='phonearea'>Phone Area</label>
            <input id='phonearea' v-model="customerPhonearea" type="number" />
          </div>
          <div style="width:100%;">
            <label for='phone'>Phone</label>
            <input id='phone' v-model="customerPhone" type="number" />
          </div>
          <div style="width:100%;">
            <label for='cuit'>CUIT</label>
            <input id='cuit' v-model="customerCuit" type="number" />
          </div>
        </template>

        <template v-else>
          <p>Nombre:
            <span>{{customerName}}</span>
          </p>
          <p>Apellido:
            <span>{{customerSurname}}</span>
          </p>
          <p>Email:
            <span>{{customerEmail}}</span>
          </p>
          <p>Password:
            <span>{{customerPassword}}</span>
          </p>
          <p>Phone Area:
            <span>{{customerPhonearea}}</span>
          </p>
          <p>Phone:
            <span>{{customerPhone}}</span>
          </p>
          <p>CUIT:
            <span>{{customerCuit}}</span>
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
export default{
  name: 'Profile',
  data () {
    return {
      oldUser: {},
      customer: {
        customerName: '',
        customerSurname: '',
        customerEmail: '',
        customerPassword: '',
        customerPhonearea: '',
        customerPhone: '',
        customerCuit: ''
      },
      isEditingProfile: false
    }
  },

  methods: {
    editProfile: function () {
      // truco para copiar el usuario y que no sea una referencia al mismo objeto
      this.oldUser = JSON.parse(JSON.stringify(this.customer))
      this.isEditingProfile = true
    },
    saveProfile: function () {
      this.isEditingProfile = false
      console.log('name: ' + this.customerName)
      console.log('surname: ' + this.customerSurname)
      console.log('email: ' + this.customerEmail)
      console.log('password: ' + this.customerPassword)
      console.log('phone: ' + this.customerPhone)
      console.log('cuit: ' + this.customerCuit)
      this.close()
    }
    .then((result) => {
      alert('saved')
    })
    .catch((err) => {
      alert(JSON.stringify(err))
    })
  },
  cancelEditProfile: function () {
    this.customer = this.oldUser
    this.isEditingProfile = false
  }
}
</script>
