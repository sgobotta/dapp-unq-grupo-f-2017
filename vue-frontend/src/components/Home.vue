<template>
    <div class="home">
      <img draggable="false" ondragstart="return false;" :src="images[currentNumber]" ref="bgimage" class="image-background"/>
    </div>
  </template>

<script>
export default {
  name: 'Home',
  props: ['auth', 'authenticated'],
  data () {
    return {
      images: ['/static/food-background1.jpg', '/static/food-background2.jpg', '/static/food-background6.jpg', '/static/food-background3.jpg', '/static/food-background4.jpg', '/static/food-background5.jpg', '/static/food-background7.jpg'],
      currentNumber: 0,
      timer: null
    }
  },

  mounted: function () {
    this.startRotation()
  },

  methods: {
    startRotation: function () {
      this.timer = setInterval(this.transition, 5000)
    },

    stopRotation: function () {
      clearTimeout(this.timer)
      this.timer = null
    },

    next: function (element) {
      this.currentNumber = (this.currentNumber + 1) % this.$data.images.length
      this.fadein(element)
    },

    transition: function () {
      let element = this.$refs.bgimage
      this.fadeout(element, this.next)
    },

    fadeout: function (element, callback) {
      var op = 1
      var timer = setInterval(function () {
        if (op <= 0.05) {
          clearInterval(timer)
          // element.style.display = 'none'
          callback(element)
        }
        element.style.opacity = op
        element.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op -= op * 0.05
      }, 0)
    },

    fadein: function (element) {
      var op = 0.05
      // element.style.display = 'block'
      var timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer)
        }
        element.style.opacity = op
        element.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op += op * 0.05
      }, 10)
    }
  }
}
</script>

<style scoped>

.image-background {
  width: 100%;
  height: auto;
}

img {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.home {
  position: relative;
  width: 100%;
}

</style>
