<template>
  <div>
    <md-toolbar class="md-accent">
      <md-button class="md-icon-button" @click="openAddMenuDialog()">
        <md-icon>add</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Menus de {{provider.name}}</h2>
    <div>
      <md-input-container md-inline>
        <md-input v-model="searchInput"></md-input>
      </md-input-container>
    </div>
      <md-button class="md-icon-button" @click="doSearch()">
        <md-icon>search</md-icon>
      </md-button>
    </md-toolbar>

    <md-layout md-row>
      <md-card v-for="menu in menus" :key="menu._id" md-with-hover>
        <md-card-media draggable="false" ondragstart="return false;" >
          <img src="/static/pepe-cacerola.jpg"/>
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{menu.name}}</div>
          <div class="md-subhead">{{menu.currencyName}} {{menu.price.amount}}</div>
        </md-card-header>

        <md-card-expand>
          <md-card-actions>
            <md-button @click="openDialog(menu)">Modificar</md-button>
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

    <edit-menu-dialog :provider="provider" :menu="currentMenu" ref='dialog' @change="refreshMenus()"/>
  </div>
</template>

<script>
import { getMenus } from './../services/menu-service'
import { getProvider } from './../services/provider-service'
import EditMenuDialog from './EditMenuDialog'

export default {
  name: 'provider-menus',
  data () {
    return {
      menus: [],
      allmenus: [],
      currentMenu: {},
      provider: {},
      searchInput: ''
    }
  },
  mounted () {
    getProvider(this.$session.getAll().session.user.email).then((response) => {
      this.provider = response.data
      console.log(this.provider)
    })
    .catch((error) => {
      console.log(error)
    })
    this.refreshMenus()
  },
  components: {
    EditMenuDialog
  },
  methods: {
    matchesSearch (menu) {
      let searchParams = this.searchInput.split(' ')
      console.log(searchParams)
      if (searchParams.length === 0) {
        return true
      } else {
        let possibleMatches = []
        for (var categ in menu.category) {
          possibleMatches.push(menu.category[categ])
        }
        possibleMatches.push(menu.name)
        possibleMatches.push(menu.description)
        for (var possibleMatch in possibleMatches) {
          for (var param in searchParams) {
            if (possibleMatches[possibleMatch].search(searchParams[param]) !== -1) {
              console.log(possibleMatches[possibleMatch])
              console.log(searchParams[param])
              return true
            }
          }
        }
        return false
      }
    },
    doSearch () {
      let searched = []
      for (var index in this.allmenus) {
        if (this.matchesSearch(this.allmenus[index])) {
          searched.push(this.allmenus[index])
        }
      }
      this.menus = searched
    },
    openAddMenuDialog () {
      this.$refs.dialog.open()
    },
    refreshMenus () {
      getMenus().then((response) => {
        let filtered = []
        for (var index in response.data) {
          if (response.data[index].ancestors[0] === this.provider.name) {
            filtered.push(response.data[index])
          }
        }
        this.allmenus = filtered
        this.menus = filtered
        this.currentMenu = this.allmenus[0]
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
@media screen and (min-width: 1920px) {
  .md-card{
    width: 24%;
    height: auto;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}


@media screen and (min-width: 1000px) and (max-width: 1920px) {
  .md-card{
    width: 32%;
    height: auto;
    margin: auto;
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

@media screen and (max-width: 999px) and (min-width: 700px) {
  .md-card{
    width: 45%;
    height: auto;
    margin: auto;
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

@media screen and (max-width: 700px) {
  .md-card{
    width: 90%;
    height: auto;
    margin: auto;
    margin-top: 6px;
    margin-bottom: 6px;
  }
}
</style>
