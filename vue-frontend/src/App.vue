<template>
  <div id="app">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">

	<md-whiteframe md-tag="md-toolbar" md-elevation="6" class="md-medium">

      <div class="md-toolbar-container">

        <h2 class="md-title noselect padded" @click="replace()">{{ title }}</h2>
        <span style="flex: 1;">
        </span>

        <div v-if="authenticated">
          <span class="md title noselect padded">Bienvenido, {{realUser.name}}</span>
        </div>
        <md-button
        class="md-primary md-raised"
        @click="openDialog('register-dialog')"
        v-if="!authenticated"
        id="register">Registrate!</md-button>

        <md-button class="md-primary md-raised"
           v-if="!authenticated"
           @click="openDialog('login-dialog')"
           id="login">
              Log In
        </md-button>

        <md-button class="md-primary md-raised"
           v-if="authenticated"
           @click="logoutNormal()">
              Log Out
        </md-button>

        <register-dialog ref='register-dialog' @registered="onRegistration"/>
        <log-in-dialog ref='login-dialog' @login="onLogin"/>

      </div>
    </md-whiteframe>

    <div class="container">
        <router-view
          :auth="auth"
          :authenticated="authenticated"
          :is-provider="isProvider">
          </router-view>
      </div>
  </div>
</template>

<script>
import AuthService from './auth/AuthService'
import RegisterDialog from './components/RegisterDialog'
import LogInDialog from './components/LogInDialog'
import { logoutService } from './services/user-service'
import { getProvider } from './services/provider-service'
import { getCustomer } from './services/customer-service'

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
      title: 'MorfiYa!',
      isProvider: false,
      user: {},
      realUser: {}
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
    },
    onRegistration: function (response) {
    },
    onLogin: function (response) {
      this.authenticated = true
      this.$session.set('session', response)
      this.user = this.$session.getAll().session.user
      if (this.user.roles[0] === 'provider') {
        this.isProvider = true
        getProvider(this.user.email).then((response) => {
          console.log(response)
          this.realUser = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        this.isProvider = false
        getCustomer(this.user.email).then((response) => {
          console.log(response)
          this.realUser = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      }
      this.user = response.user
      console.log(this.user)
    },
    logoutNormal: function () {
      const email = this.$session.getAll().session.user.email
      console.log(email)
      logoutService(email)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.authenticated = false
      this.$session.destroy()
      this.replace()
    },
    replace () {
      this.$router.replace('/home')
    }
  },
  components: {
    RegisterDialog,
    LogInDialog
  }
}
</script>

<style src="vue-material/dist/vue-material.css"></style>

<style>

body.md-theme-default {
  background-color: rgba(0, 0, 0, 0);
}

.padded {
  padding: 5px 5px 5px 5px;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}

.centered {
  text-align: center;
}

.background {
  background: black;
}

@media screen and (max-width: 599px) {
  .md-dialog {
    width: 90%;
  }

  .footer {
    font-size: 12px;
  }
}

@media screen and (min-width: 600px) and (max-width: 799px) {
  .md-dialog {
    width: 75%;
  }
  .footer {
    font-size: 15px;
  }
}


@media screen and (min-width: 800px) and (max-width: 1199px) {
  .md-dialog {
    width: 60%;
  }
  .footer {
    font-size: 20px;
  }
}

@media screen and (min-width: 1200px) and (max-width: 2099px){
  .md-dialog {
    width: 40%;
  }

  .footer {
    font-size: 25px;
  }
}

@media screen and (min-width: 2100px) and (max-width: 2599px) {
  .md-dialog {
    width: 30%;
  }

  .footer {
    font-size: 35px;
  }
}

@media screen and (min-width: 2600px) {
  .md-dialog {
    width: 20%;
  }
  .footer {
    font-size: 45px;
  }
}

html {
  background: url(/static/food-background3.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>
