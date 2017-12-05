<template>
    <div class="home">
      <div class="centered md-title with-outline noselect responsive-text" v-show="!authenticated">Por favor, ingrese para utilizar la apliación</div>
      <md-layout class="centered" md-gutter v-show="authenticated">
        <md-card md-with-hover class="center-card noselect" v-if="!isProvider">
          <md-card-header>
            <div class="md-title">Menús</div>
            <div class="md-subheading">Puedes buscar los menús que te interecen</div>
          </md-card-header>

          <md-card-actions>
            <md-button @click="replace('/menus')">Acceder</md-button>
          </md-card-actions>
        </md-card>

        <md-card md-with-hover class="center-card noselect" v-if="isProvider">
          <md-card-header>
            <div class="md-title">Menús de proveedor</div>
            <div class="md-subheading">Puedes revisar y agregar tus menús</div>
          </md-card-header>

          <md-card-actions>
            <md-button @click="replace('/provider-menus')">Acceder</md-button>
          </md-card-actions>
        </md-card>

        <md-card md-with-hover class="center-card noselect">
          <md-card-header>
            <div class="md-title">Perfil</div>
            <div class="md-subheading">Puedes revisar y modificar tus datos</div>
          </md-card-header>

          <md-card-actions>
            <md-button @click="replace('/profile')">Acceder</md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
      <div class="footer noselect">
        MorfiYa! - Desarrollo de aplicaciones -
        Botta, Santiago -
        Castro Riquelme, Victoria -
        Rodriguez Defago, Juan Manuel
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['auth', 'authenticated', 'isProvider'],
  data () {
    return {
    }
  },

  mounted: function () {
  },

  methods: {
    replace (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped>

img {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.home {
  position: absolute;
  width: 100%;
  height: 85vh;
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

  .responsive-text {
    font-size: 40px;
    width: 90%;
  }

  .md-layout {
    width: 100%;
    height: 80%;
  }

  .home {
    position: absolute;
    width: 100%;
    height: 70vh;
    text-align: center;
  }

  .centered {
      position: absolute;
      top: 40%;
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
    font-size: 3  0px;
    color: white;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
  }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {

  .responsive-text {
    font-size: 50px;
    width: 90%;
  }

  .md-layout {
    height: 80%;
  }

  .home {
    position: absolute;
    width: 100%;
    height: 70vh;
    text-align: center;
  }

  .centered {
      position: absolute;
      top: 40%;
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

@media screen and (min-width: 1200px) and (max-width: 2700px) {

  .responsive-text {
    font-size: 60px;
    width: 90%;
  }

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

@media screen and (min-width: 2700px) {

  .responsive-text {
    font-size: 100px;
    width: 90%;
  }

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
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: black;
  }
}


.with-outline {
  line-height: 150%
}

</style>
