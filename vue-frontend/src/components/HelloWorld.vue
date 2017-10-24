<template>
  <div class="hello">
      
 <md-whiteframe md-tag="md-toolbar" md-elevation="2" class="md-medium">
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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'MorfiYa!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.centered {
  text-align: center;
}

</style>
