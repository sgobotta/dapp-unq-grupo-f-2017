<template>
  <div>
    <md-dialog ref="dialog">
      <md-dialog-content>
        <md-input-container>
          <label>Nombre</label>
          <md-input v-model="name" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Descripción</label>
          <md-input v-model="description" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Moneda</label>
          <md-input v-model="currencyName" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Precio</label>
          <md-input v-model="priceAmount" type="number" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Precio de delivery</label>
          <md-input v-model="deliveryPriceAmount" type="number" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Stock diario</label>
          <md-input v-model="maxDailySalesQuantity" type="number" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Categorías</label>
          <md-input v-model="categoryInput" required></md-input>
        </md-input-container>

        <md-layout md-row md-align="center">
          <md-button @click="addOrUpdateMenu()" :disabled="!valid">Confirmar</md-button>
          <md-button @click="close()">Cancelar</md-button>
        </md-layout>

      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import { createMenu } from './../services/menu-service'

export default {
  name: 'edit-menu-dialog',
  props: ['provider', 'menu'],
  data () {
    return {
      name: '',
      description: '',
      category: [],
      currencyName: '',
      deliveryPriceAmount: 0,
      priceAmount: 0,
      validityRange: [],
      deliveryTimeRange: {},
      categoryInput: '',
      maxDailySalesQuantity: 0
    }
  },
  computed: {
    valid () {
      return this.name !== '' && this.description !== '' && this.category !== [] && this.maxDailySalesQuantity !== 0 && this.currencyName !== ''
    }
  },
  methods: {
    open () {
      this.$refs.dialog.open()
    },
    close () {
      this.$refs.dialog.close()
    },
    addOrUpdateMenu () {
      if (this.menu) {
        console.log('HAT MENU')
      }
      console.log(this.provider)
      this.category = this.categoryInput.split(' ')
      console.log(this.name)
      console.log(this.description)
      console.log(this.category)
      console.log(this.currencyName)
      console.log(this.priceAmount)
      console.log(this.deliveryPriceAmount)

      const newMenu = {
        name: this.name,
        description: this.description,
        category: this.category,
        ancestors: [this.provider.name],
        currencyName: this.currencyName,
        price: { amount: this.priceAmount },
        deliveryPrice: { amount: this.deliveryPrice },
        validityRange: this.validityRange,
        deliveryTimeRange: this.provider.availability,
        maxDailySalesQuantity: this.maxDailySalesQuantity,
        minQuantity: 1,
        minQuantityPrice: { amount: this.priceAmount }
      }
      createMenu(newMenu).then((response) => {
        console.log(response)
        this.$emit('change')
      })
      .catch((error) => {
        console.log(error)
      })
      this.close()
    }
  }
}
</script>
