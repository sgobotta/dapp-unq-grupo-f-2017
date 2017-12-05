<template>
    <div class="home">
      <img draggable="false" ondragstart="return false;" :src="images[currentNumber]" ref="bgimage" class="image-background"/>
      <div class="centered md-title with-outline" v-show="!authenticated">Por favor, ingrese para utilizar la App</div>
      <md-layout class="centered" md-gutter v-show="authenticated">
        <md-card md-with-hover class="center-card">
          <md-card-header>
            <div class="md-title">Menu</div>
            <div class="md-subheading">Puedes buscar los menús que te interecen</div>
          </md-card-header>

          <md-card-actions>
            <md-button @click="replace('/menus')">Acceder</md-button>
          </md-card-actions>
        </md-card>

        <md-card md-with-hover class="center-card">
          <md-card-header>
            <div class="md-title">Perfil</div>
            <div class="md-subheading">Puedes revisar y modificar tus datos</div>
          </md-card-header>

          <md-card-actions>
            <md-button @click="replace('/profile')">Acceder</md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
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
      this.timer = setInterval(this.transition, 10000)
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
    },
    replace (path) {
      this.$router.replace(path)
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
  text-align: center;
}

/* Bottom left text */
.bottom-left {
    position: absolute;
    bottom: 8px;
    left: 16px;
}

/* Top left text */
.top-left {
    position: absolute;
    top: 8px;
    left: 8px;
    width:100%;
    height: auto;
}

/* Top right text */
.top-right {
    position: absolute;
    top: 8px;
    right: 16px;
}

/* Bottom right text */
.bottom-right {
    position: absolute;
    bottom: 8px;
    right: 16px;
}

@media screen and (max-width: 600px) {
  .centered {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
  }

  .center-card {
    width: 100%;
    height: auto;
    padding: 5px 5px 5px 5px;
    margin: 10px 10px 10px 10px;
  }

  .with-outline {
    font-size: 20px;
    color: white;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
  }
}


@media screen and (min-width: 600px) and (max-width: 1200px) {
  .centered {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
  }

  .center-card {
    width: 100%;
    height: auto;
    padding: 5px 5px 5px 5px;
    margin: 10px 10px 10px 10px;
  }

  .with-outline {
    font-size: 40px;
    color: white;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
  }
}

@media screen and (min-width: 1200px) and (max-width: 2600px) {
  .centered {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
  }

  .center-card {
    width: 100%;
    height: auto;
    padding: 5px 5px 5px 5px;
    margin: 10px 10px 10px 10px;
  }

  .with-outline {
    font-size: 50px;
    color: white;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
  }
}

@media screen and (min-width: 2600px) {
  .centered {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
  }

  .center-card {
    width: 100%;
    height: auto;
    padding: 5px 5px 5px 5px;
    margin: 10px 10px 10px 10px;
  }

  .with-outline {
    font-size: 80px;
    color: white;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
  }
}

.with-outline {
  line-height: 150%
}


</style>
