<template>
  <div id="app" class="background">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">

	<md-whiteframe md-tag="md-toolbar" md-elevation="6" class="md-medium">

      <div class="md-toolbar-container">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>

        <span style="flex: 1;">
              <h2 class="md-title centered">{{ title }}</h2>
        </span>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>filter_list</md-icon>
        </md-button>

        <button
           class="btn btn-primary btn-margin"
           v-if="!authenticated"
           @click="login()">
              Log In
        </button>

        <button
           class="btn btn-primary btn-margin"
           v-if="authenticated"
           @click="logout()">
              Log Out
        </button>
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
    logout
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
