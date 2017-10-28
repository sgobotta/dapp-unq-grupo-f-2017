<template>
  <div id="app">
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

      </div>

    </md-whiteframe>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'MorfiYa!'
    }
  }
}
</script>

<style src="vue-material/dist/vue-material.css"></style>

<style> 

.centered {
  text-align: center;
}

</style>