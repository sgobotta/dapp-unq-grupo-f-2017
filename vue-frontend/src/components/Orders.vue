<template>

<div>

  <md-layout md-row>

    <md-card v-for="order in orders" :key="order._id" md-with-hover>

      <md-card-header>
        <div class="md-title">{{order.menu.name}}</div>
        <div class="md-subhead">{{order.menu.description}}</div>
      </md-card-header>

      <md-card-content>
        <div>Tipo de orden: {{order.deliveryType}}</div>
        <div>Fecha de pedido: {{order.date}}</div>
        <div v-if="order.deliveryType === 'delivery'">
          Precio de delivery: {{order.menu.deliveryPrice.currencyName}} {{order.menu.deliveryPrice.amount}}
        </div>
        <div>Cantidad: {{order.quantity}}</div>
        <div>Precio del menú: {{order.menu.price.currencyName}} {{order.menu.price.amount}}</div>
        <div>Total: {{order.finalPrice.currencyName}} {{order.finalPrice.amount}}</div>
        <div v-if="order.deliveryType === 'delivery'">
          Tiempo estimado de entrega en domicilio: {{order.deliveryTime}} hrs.
        </div>
        <div v-if="order.deliveryType === 'pickup'">
          Tiempo estimado de entrega en local: {{order.deliveryTime}} hrs.
        </div>
      </md-card-content>

      <md-card-actions>
        <span>No olvides puntuar tu experiencia</span>
        <md-button @click='positiveRate'><md-icon>&#xE7F2;</md-icon></md-button>
        <md-button @click='negativeRate'><md-icon>&#xE814;</md-icon></md-button>
      </md-card-actions>

    </md-card>

  </md-layout>

</div>

</template>

<script>

import { getOrders } from './../services/order-service'
import { getCustomer } from './../services/customer-service'
// import { rateProvider } from './../services/rating-service'

export default {
  name: 'orders',
  data () {
    return {
      orders: [],
      customer: null
    }
  },
  mounted () {
    const user = this.$session.getAll().session.user
    if (user.roles[0] === 'customer') {
      getCustomer(user.email)
      .then((response) => {
        this.customer = response.data
        if (response.success) {
          getOrders(this.customer.cuit)
          .then((response) => {
            this.orders = response.orders
          })
          .catch((error) => {
            console.log(error)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  methods: {
    positiveRate () {

    },
    negativeRate () {

    }
  }
}
</script>
