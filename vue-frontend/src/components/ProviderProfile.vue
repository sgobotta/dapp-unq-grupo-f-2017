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
            <input id='nombre' v-model='provider.name' type="text" />
          </div>
          <div style="width:100%;">
            <label for='email'>Email</label>
            <input id='apellido' v-model='provider.email' type="email" />
          </div>
          <div style="width:100%;">
            <label for='phonearea'>Codigo de area</label>
            <input id='phonearea' v-model="provider.phone.area" type="number" />
          </div>
          <div style="width:100%;">
            <label for='phone'>Telefono</label>
            <input id='phone' v-model="provider.phone.number" type="number" />
          </div>
          <div style="width:100%;">
            <label for='description'>Descripcion</label>
            <input id='description' v-model="provider.description" maxlength="200" type="text" />
          </div>
          <div style="width:100%;">
            <label for='website'>Web</label>
            <input id='website' v-model="provider.website"/>
          </div>
        </template>

        <template v-else>
          <p>Nombre:
            <span>{{provider.name}}</span>
          </p>
          <p>Email:
            <span>{{provider.email}}</span>
          </p>
          <p>Codigo de area:
            <span>{{provider.phone.area}}</span>
          </p>
          <p>Telefono:
            <span>{{provider.phone}}</span>
          </p>
          <p>Descripcion:
            <span>{{provider.description}}</span>
          </p>
          <p>Web:
            <span>{{provider.website}}</span>
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
import { registerProvider } from './../services/provider-service'

export default{
  name: 'Profile',
  data () {
    return {
      oldProvider: {},
      provider: {
        name: '',
        email: '',
        phone: {
          area: '',
          number: ''
        },
        description: '',
        website: ''
      },
      isEditingProfile: false
    }
  },

  methods: {
    editProfile: function () {
      // truco para copiar el usuario y que no sea una referencia al mismo objeto
      this.oldProvider = JSON.parse(JSON.stringify(this.provider))
      this.isEditingProfile = true
    },
    saveProfile: function () {
      this.isEditingProfile = false
      console.log('name: ' + this.provider.name)
      console.log('email: ' + this.provider.email)
      console.log('phone: ' + this.provider.phone)

      registerProvider(provider)
        .then((response) => {
          console.log(response)
          if (response.success) {
            this.$emit('registered', response)
          }
        })
        .catch((error) => {
          console.log(error)
        })

      this.close()
      // this.$http
      // .post(this.rootUrl + '/user/save', {
      //   name: this.provider.providerName,
      //   apellido: this.provider.providerSurname
      // })
      // .then((result) => {
      //   alert('saved')
      // })
      // .catch((err) => {
      //   alert(JSON.stringify(err))
      // })
    },
    cancelEditProfile: function () {
      this.provider = this.oldProvider
      this.isEditingProfile = false
    }
  }
}
  </script>
