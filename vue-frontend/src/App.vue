<template>
  <div id="app" class="background">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">

	<md-whiteframe md-tag="md-toolbar" md-elevation="6" class="md-medium">

      <div class="md-toolbar-container">

        <md-button 
        class="md-primary md-raised"
        @click="openDialog('dialog')"
        v-if="!authenticated">Registrate!</md-button>

        <span style="flex: 1;">
              <h2 class="md-title centered">{{ title }}</h2>
        </span>

        <md-button class="md-primary md-raised"
           v-if="!authenticated"
           @click="login()">
              Log In
        </md-button>

        <md-button class="md-primary md-raised"
           v-if="authenticated"
           @click="logout()">
              Log Out
        </md-button>

        <md-dialog md-open-from="#register" md-close-to="#register" ref="dialog">
          <md-dialog-title>Formulario de registro</md-dialog-title>

          <md-dialog-content>

            <md-input-container>
              <label>Nombre</label>
              <md-input placeholder="Nombre"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Apellido</label>
              <md-input placeholder="Apellido"></md-input>
            </md-input-container>
            <md-input-container>
              <label>E-Mail</label>
              <md-input placeholder="E-Mail"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Password</label>
              <md-input placeholder="Password"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Phone</label>
              <md-input placeholder="Phone"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Address</label>
              <md-input placeholder="Address"></md-input>
            </md-input-container>
            <md-input-container>
              <label>CUIT</label>
              <md-input placeholder="CUIT"></md-input>
            </md-input-container>
            
          </md-dialog-content>

        </md-dialog>

      </div>
    </md-whiteframe>

    <div class="container">
        <router-view
          :auth="auth"
          :authenticated="authenticated">
          </router-view>
      </div>
    </div>
</template>

<script>
import AuthService from './auth/AuthService'

const auth = new AuthService()
const {login, logout, authenticated, authNotifier} = auth

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated,
      title: 'MorfiYa!'
    }
  },
  methods: {
    login,
    logout,
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    }
  }
}
</script>

<style src="vue-material/dist/vue-material.css"></style>

<style>

.centered {
  text-align: center;
}

.background {
  background: black;
}

</style>
