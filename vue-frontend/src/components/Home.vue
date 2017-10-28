<template>
  <div class="home">

  <md-image :md-src="images[currentNumber % images.length]" class="image-background" :key="image">asd</md-image>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      images: ['/static/food-background1.jpg', '/static/food-background2.jpg', '/static/food-background3.jpg'],
      currentNumber: 0,
      timer: null
    }
  },

  mounted: function () {
    this.startRotation()
  },

  methods: {
    startRotation: function () {
      this.timer = setInterval(this.next, 6000)
    },

    stopRotation: function () {
      clearTimeout(this.timer)
      this.timer = null
    },

    next: function () {
      this.currentNumber += 1
    }
  }
}
</script>

<style scoped>

.image-background {
  background-color: black;
}


</style>