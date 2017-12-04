<template>

  <md-layout md-gutter md-row>
    <md-card v-for="menu in menus" :key="menu._id" md-with-hover>
      <md-card-media>
        <img src="/static/pepe-cacerola.jpg"/>
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{menu.name}}</div>
        <div class="md-subhead">{{menu.price.amount}} {{menu.currencyName}}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions>
          <md-button>Comprar</md-button>
          <span style="flex: 1"></span>
          <md-button class="md-icon-button" md-expand-trigger>
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-actions>

        <md-card-content>
          {{menu.description}}
        </md-card-content>
      </md-card-expand>
    </md-card>
  </md-layout>
</template>

<script>
import { getMenus } from './../services/menu-service'

export default {
  name: 'menu-home',
  data () {
    return {
      menus: [{ name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }, { name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }, { name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }, { name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }, { name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }, { name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }, { name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }, { name: 'Pepe a la cacerola', price: { amount: 20 }, currencyName: 'ARS', description: 'Este plato es alto pepe a la re cacerola amigo' }]
    }
  },
  mounted () {
    this.menus = getMenus()
  }
}
</script>

<style scoped>
.md-card{
  width: 24.5%;
  height: auto;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
}

.md-layout {
  background: white;
  padding-top: 10px;
}
</style>
