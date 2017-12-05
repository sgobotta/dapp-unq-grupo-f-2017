<template>
  <md-dialog ref="orderDialog">
    <md-dialog-content>
      <md-layout md-column>
        <md-layout md-column md-gutter>
          <div class="md-headline">Información de compra</div>
          <div class="md-subheading"><b>Menu</b> {{name}}</div>
          <div class="md-subheading"><b>Proveedor</b> {{vendor}}</div>
          <div class="md-subheading"><b>Precio</b> {{priceCurrency}} {{currentPrice}}</div>
        </md-layout>

        <div>
          <md-input-container>
            <label>Cantidad</label>
            <md-input required v-model="quantity" type="number" max="maxQuantity" @input="updatePrice()"></md-input>
          </md-input-container>
        </div>
        <md-layout md-column>
          <label class="md-title">Cómo lo queres recibir?</label>
          <md-radio v-model="deliveryType" id="delivery" name="deliveryType" md-value="delivery" class="md-primary" @input="updatePrice()">Delivery</md-radio>
          <md-radio v-model="deliveryType" id="pickup" name="deliveryType" md-value="pickup" class="md-primary" @input="updatePrice()">Lo paso a buscar</md-radio>
        </md-layout>
        <md-layout md-row md-align="center">
          <md-button>Comprar</md-button>
          <md-button @click="close()">Cancelar</md-button>
        </md-layout>
      </md-layout>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import { generateOrder } from './../services/order-service'
import { getCustomer } from './../services/customer-service'

export default {
  name: 'order-dialog',
  props: ['name', 'priceAmount', 'priceCurrency', 'vendor', 'maxQuantity', 'deliveryPrice'],
  data () {
    return {
      quantity: 0,
      customer: null,
      deliveryTime: 0,
      deliveryType: '',
      currentPrice: this.priceAmount
    }
  },
  methods: {
    open () {
      this.quantity = 0
      this.deliveryTime = 0
      this.deliveryType = ''
      this.currentPrice = this.priceAmount
      this.$refs.orderDialog.open()
      this.updatePrice()
    },
    close () {
      this.$refs.orderDialog.close()
    },
    buy () {
      const user = this.$session.getAll().session.user
      getCustomer(user.email)
      .then((response) => {
        if (response.success) {
          this.customer = response.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
      const order = { customerId: this.customer.cuit, menu: { name: this.name, ancestors: [this.vendor] }, quantity: this.quantity, deliveryType: this.deliveryType, deliveryTime: this.deliveryTime }
      generateOrder(order)
      .then((response) => {
        if (response.success) {
          console.log('YAS GURL')
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updatePrice () {
      this.currentPrice = this.priceAmount * this.quantity
      if (this.deliveryType === 'delivery') {
        this.currentPrice += this.deliveryPrice
      }
    }
  }
}
</script>
