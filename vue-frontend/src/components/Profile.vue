<template>
  <div>
    <md-layout md-column md-align="center">
      <md-list class="centered">
        <md-list-item class="md-title">Nombre: {{realUser.name}}</md-list-item>
        <md-list-item class="md-title" v-if="!isProvider">Apellido: {{realUser.surname}}</md-list-item>
        <md-list-item class="md-title">E-Mail: {{realUser.email}}</md-list-item>
        <md-list-item class="md-title" v-if="isProvider">Descripción: {{realUser.description}}</md-list-item>
        <md-list-item class="md-title" v-if="!isProvider">CUIT: {{realUser.cuit}}</md-list-item>
      </md-list>
    </md-layout>
  </div>
</template>

<script>
import { getProvider } from './../services/provider-service'
import { getCustomer } from './../services/customer-service'

export default {
  name: 'profile',
  data () {
    return {
      isProvider: false,
      user: {},
      realUser: {}
    }
  },
  mounted () {
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
  }
}
</script>

<style scoped>


</style>
