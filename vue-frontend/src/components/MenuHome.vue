<template>
<div>
  <md-sidenav class="md-left" ref="sidenav">
    <md-list>
      <md-list-item md-expand-multiple>
        <md-icon>whatshot</md-icon>
        <label class="md-title">Category</label>
        <md-list-expand>
          <md-list-item v-for="category in getAllCategories()" :key="category">
            <md-checkbox :md-value="category" v-model="filterCategories" @change="filterMenus()">
              {{category}}</md-checkbox></md-list-item>
        </md-list-expand>
      </md-list-item>

      <md-list-item md-expand-multiple>
        <md-icon>whatshot</md-icon>
        <label class="md-title">Vendors</label>
        <md-list-expand>
          <md-list-item v-for="vendor in getAllVendors()" :key="vendor">
            <md-checkbox :md-value="vendor" v-model="filterVendors" @change="filterMenus()">
              {{vendor}}</md-checkbox></md-list-item>
        </md-list-expand>
      </md-list-item>
    </md-list>
  </md-sidenav>

  <md-layout md-column>

    <md-toolbar class="md-transparent">
      <md-button class="md-icon-button" @click="toggleSidenav()">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Menus</h2>
    <div>
      <md-input-container md-inline>
        <label>Search</label>
        <md-input v-model="searchInput" @keydown.enter="doSearch()"></md-input>
      </md-input-container>
    </div>
      <md-button class="md-icon-button" @click="doSearch()">
        <md-icon>search</md-icon>
      </md-button>
    </md-toolbar>

    <md-layout md-row>
      <md-card v-for="menu in menus" :key="menu._id" md-with-hover>
        <md-card-media>
          <img src="/static/pepe-cacerola.jpg"/>
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{menu.name}}</div>
          <div class="md-subhead">{{menu.currencyName}} {{menu.price.amount}}</div>
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
  </md-layout>
</div>
</template>

<script>
import { getMenus } from './../services/menu-service'

export default {
  name: 'menu-home',
  data () {
    return {
      menus: [],
      filterCategories: [],
      allmenus: [],
      filteredMenus: [],
      searchInput: '',
      filterVendors: []
    }
  },
  mounted () {
    getMenus().then((response) => {
      console.log(response)
      this.allmenus = response.data
      this.menus = response.data
      this.filteredMenus = response.data
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    getAllCategories () {
      let result = []
      for (var index in this.allmenus) {
        for (var categ in this.allmenus[index].category) {
          if (!result.includes(this.allmenus[index].category[categ])) {
            result.push(this.allmenus[index].category[categ])
          }
        }
      }
      return result
    },
    getAllVendors () {
      let result = []
      for (var index in this.allmenus) {
        if (!result.includes(this.allmenus[index].ancestors[0])) {
          result.push(this.allmenus[index].ancestors[0])
        }
      }
      return result
    },
    toggleSidenav () {
      this.$refs.sidenav.toggle()
    },
    filteredByCategory () {
      if (this.filterCategories.length > 0) {
        let filtered = []
        for (var index in this.allmenus) {
          for (var filterCateg in this.filterCategories) {
            for (var categ in this.allmenus[index].category) {
              if (this.allmenus[index].category[categ] === this.filterCategories[filterCateg]) {
                filtered.push(this.allmenus[index])
              }
            }
          }
        }
        return filtered
      } else {
        return this.allmenus
      }
    },
    filteredByVendor () {
      if (this.filterVendors.length > 0) {
        let filtered = []
        for (var index in this.allmenus) {
          for (var filterVendor in this.filterVendors) {
            if (this.allmenus[index].ancestors[0] === this.filterVendors[filterVendor]) {
              filtered.push(this.allmenus[index])
            }
          }
        }
        return filtered
      } else {
        return this.allmenus
      }
    },
    unionList (list1, list2) {
      if (list1 === this.allmenus) {
        return list2
      }
      if (list2 === this.allmenus) {
        return list1
      }
      return list1.concat(list2)
    },
    filterMenus () {
      let result = this.unionList(this.filteredByVendor(), this.filteredByCategory())
      this.menus = result
      this.filteredMenus = result
    },
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
      for (var index in this.filteredMenus) {
        if (this.matchesSearch(this.filteredMenus[index])) {
          searched.push(this.filteredMenus[index])
        }
      }
      this.menus = searched
    }
  }
}
</script>

<style scoped>

.md-layout {
  background: white;
  padding-top: 10px;
}


@media screen and (min-width: 800px) {
  .md-card{
    width: 24%;
    height: auto;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}

@media screen and (max-width: 799px) and (min-width: 500px) {
  .md-card{
    width: 40%;
    height: auto;
    margin: auto;
    margin-top: 3px;
    margin-bottom: 3px;
  }
}

@media screen and (max-width: 499px) {
  .md-card{
    width: 80%;
    height: auto;
    margin: auto;
    margin-top: 2px;
    margin-bottom: 2px;
  }
}
</style>
