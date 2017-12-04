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
            <input id='nombre' v-model='providerName' type="text" />
          </div>
          <div style="width:100%;">
            <label for='email'>Email</label>
            <input id='apellido' v-model='providerEmail' type="email" />
          </div>
          <div style="width:100%;">
            <label for='password'>Password</label>
            <input id='password' v-model='providerPassword' type="email" />
          </div>
          <div style="width:100%;">
            <label for='phonearea'>Phone Area</label>
            <input id='phonearea' v-model="providerPhonearea" type="number" />
          </div>
          <div style="width:100%;">
            <label for='phone'>Phone</label>
            <input id='phone' v-model="providerPhone" type="number" />
          </div>
          <div style="width:100%;">
            <label for='logo'>Logo</label>
            <input id='cuit' v-model="providerLogo" type="number" />
          </div>
          <div style="width:100%;">
            <label for='description'>Descripcion</label>
            <input id='description' v-model="providerDescription" maxlength="200" type="text" />
          </div>
        </template>

        <template v-else>
          <p>Nombre:
            <span>{{provider.nombre}}</span>
          </p>
          <p>Email:
            <span>{{provider.email}}</span>
          </p>
          <p>Phone Area:
            <span>{{provider.phonearea}}</span>
          </p>
          <p>Phone:
            <span>{{provider.phone}}</span>
          </p>
          <p>Logo:
            <span>{{provider.logo}}</span>
          </p>
          <p>Descripcion:
            <span>{{provider.description}}</span>
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
      rootUrl: 'http://127.0.0.1:3000/',
      oldUser: {},
      provider: {
        providerName: '',
        providerLogo: '',
        providerEmail: '',
        providerPhoneArea: '',
        providerPhone: '',
        providerAddress: '',
        providerCity: '',
        providerOpenTimes: '',
        providerDescription: '',
        providerPassword: ''
      },
      isEditingProfile: false
    }
  },

  methods: {
    editProfile: function () {
      // truco para copiar el usuario y que no sea una referencia al mismo objeto
      this.oldUser = JSON.parse(JSON.stringify(this.provider))
      this.isEditingProfile = true
    },
    saveProfile: function () {
      this.isEditingProfile = false
      console.log('name: ' + this.providerName)
      console.log('surname: ' + this.providerSurname)
      console.log('email: ' + this.providerEmail)
      console.log('password: ' + this.providerPassword)
      console.log('phone: ' + this.providerPhone)
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
    this.provider = this.oldUser
    this.isEditingProfile = false
  }
}
</script>
