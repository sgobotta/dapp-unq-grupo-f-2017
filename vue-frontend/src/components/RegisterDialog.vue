<template>
  <md-dialog md-open-from="#register" md-close-to="#register" ref="dialog">
    <md-dialog-content>
      <md-tabs md-fixed md-elevation="4" class="md-transparent">
        <md-tab id="customer" md-label="Customer">
          <md-layout md-align="center">
            <md-stepper md-alternate-labels @completed="applyCustomer()">
              <md-step md-label="Personal Information" :md-continue="validStep1" :md-error="!validStep1">
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="customerName" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="customerSurname" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>E-Mail</label>
                  <md-input v-model="customerEmail" type="email" required></md-input>
                </md-input-container>

                <md-input-container md-has-password>
                  <label>Password</label>
                  <md-input v-model="customerPassword" type="password" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone area</label>
                  <md-input v-model="customerPhonearea" type="number" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone</label>
                  <md-input v-model="customerPhone" type="number" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>CUIT</label>
                  <md-input v-model="customerCuit" required></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Address" :md-disabled="!validStep1" :md-continue="validStep2">
                <div class="maps-autocomplete md-input-container md-theme-default">
                  <gmap-autocomplete
                    @place_changed="usePlace">
                  </gmap-autocomplete>
                </div>
                <gmap-map
                  :center="center"
                  :zoom="zoom"
                  map-type-id="terrain"
                  style="width: auto; height: 300px" v-if="validStep1">
                  <gmap-marker v-for="(marker, index) in markers"
                    :key="index"
                    :position="marker.position">
                  </gmap-marker>
                </gmap-map>
              </md-step>

              <md-step md-label="Verify Information" :md-disabled="!validStep2">
                <h2>Verifique la información provista</h2>
                </br>
                <h3>Nombre y apellido</h3>
                <p>{{customerName + ' ' + customerSurname}}</p>
                </br>
                <h3>E-Mail</h3>
                <p>{{customerEmail}}</p>
                </br>
                <h3>Phone</h3>
                <p>{{customerPhonearea + ' ' + customerPhone}}</p>
                </br>
                <h3>CUIT</h3>
                <p>{{customerCuit}}</p>
                </br>
              </md-step>
            </md-stepper>
          </md-layout>
        </md-tab>

        <md-tab id="provider" md-label="Provider">
          <md-layout md-align="center">
            <md-stepper md-alternate-labels @completed="applyProvider()">
              <md-step md-label="Personal Information" :md-continue="validStep1Provider" :md-error="!validStep1Provider">
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="providerName" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>E-Mail</label>
                  <md-input v-model="providerEmail" type="email" required></md-input>
                </md-input-container>

                <md-input-container md-has-password>
                  <label>Password</label>
                  <md-input v-model="providerPassword" type="password" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone area</label>
                  <md-input v-model="providerPhoneArea" type="number" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Phone</label>
                  <md-input v-model="providerPhone" type="number" required></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Address and availability" :md-continue="validStep2Provider" :md-disabled="!validStep1Provider" :md-error="!validStep2Provider">
                <div class="maps-autocomplete md-input-container md-theme-default">
                  <gmap-autocomplete
                    @place_changed="usePlace">
                  </gmap-autocomplete>
                </div>
                <gmap-map
                  :center="center"
                  :zoom="zoom"
                  map-type-id="terrain"
                  style="width: auto; height: 300px" v-if="validStep1Provider">
                  <gmap-marker v-for="(marker, index) in markers"
                    :key="index"
                    :position="marker.position">
                  </gmap-marker>
                </gmap-map>

                <md-layout md-row md-gutter v-for="day in days" :key="day">
                  <label>{{day}}</label>
                </md-layout>

              </md-step>

              <md-step md-label="Description" :md-continue="validStep3Provider" :md-disabled="!validStep2Provider" :md-error="!validStep3Provider">

                <md-input-container>
                  <label>Logo URL</label>
                  <md-input v-model="providerLogo" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Descripción</label>
                  <md-input v-model="providerDescription" maxlength="200"></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Verify Information" :md-disabled="!validStep3Provider">
                <h2>Verifique la información provista</h2>
                </br>
                <h3>Nombre</h3>
                <p>{{providerName}}</p>
                </br>
                <h3>Descripción</h3>
                <p>{{providerDescription}}</p>
                </br>
                <h3>Logo</h3>
                <p>{{providerLogo}}</p>
                </br>
                <h3>E-Mail</h3>
                <p>{{providerEmail}}</p>
                </br>
              </md-step>
            </md-stepper>
          </md-layout>
        </md-tab>
      </md-tabs>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import { registerCustomer } from './../services/customer-service'
import { registerProvider } from './../services/provider-service'

export default {
  name: 'register-dialog',
  data () {
    return {
      customerName: '',
      customerSurname: '',
      customerEmail: '',
      customerPassword: '',
      customerPhonearea: '',
      customerPhone: '',
      customerCuit: '',
      providerName: '',
      providerLogo: '',
      providerEmail: '',
      providerPhoneArea: '',
      providerPhone: '',
      providerAddress: '',
      providerCity: '',
      providerOpenTimes: '',
      providerDescription: '',
      providerPassword: '',
      avMonday: [],
      avTuesday: [],
      avWednesday: [],
      avThursday: [],
      avFriday: [],
      avSaturday: [],
      avSunday: [],
      markers: [],
      place: null,
      center: {lat: -34.7068012, lng: -58.29490709999999},
      zoom: 16,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  methods: {
    open: function () {
      this.$refs['dialog'].open()
    },
    close: function () {
      this.$refs['dialog'].close()
    },
    applyCustomer: function () {
      console.log('name: ' + this.customerName)
      console.log('surname: ' + this.customerSurname)
      console.log('email: ' + this.customerEmail)
      console.log('password: ' + this.customerPassword)
      console.log('phone: ' + this.customerPhone)
      console.log('cuit: ' + this.customerCuit)
      const request = {
        user: {
          email: this.customerEmail,
          password: this.customerPassword
        },
        customer: {
          name: this.customerName,
          surname: this.customerSurname,
          cuit: this.customerCuit,
          email: this.customerEmail,
          phone: {
            area: this.customerPhonearea,
            number: this.customerPhone
          },
          address: {
            street: this.place.address_components[1].long_name,
            number: this.place.address_components[0].long_name,
            city: this.place.address_components[3].long_name,
            state: this.place.address_components[4].long_name,
            mapsLocation: {
              latitude: this.place.geometry.location.lat(),
              longitude: this.place.geometry.location.lng()
            }
          }
        }
      }
      registerCustomer(request)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.close()
    },
    applyProvider: function () {
      console.log('name: ' + this.providerName)
      console.log('surname: ' + this.providerSurname)
      console.log('email: ' + this.providerEmail)
      console.log('password: ' + this.providerPassword)
      console.log('phone: ' + this.providerPhone)
      const provider = {
        name: this.providerName,
        logo: this.providerLogo,
        address: {
          street: this.place.address_components[1].long_name,
          number: this.place.address_components[0].long_name,
          city: this.place.address_components[3].long_name,
          state: this.place.address_components[4].long_name,
          mapsLocation: {
            latitude: this.place.geometry.location.lat(),
            longitude: this.place.geometry.location.lng()
          }
        },
        description: this.providerDescription,
        website: this.providerWebsite,
        email: this.providerEmail,
        phone: {
          area: this.providerPhoneArea,
          number: this.providerPhone
        },
        availability: {
          monday: this.avMonday,
          tuesday: this.avTuesday,
          wednesday: this.avWednesday,
          thursday: this.avThursday,
          friday: this.avFriday,
          saturday: this.avSaturday,
          sunday: this.avSunday
        },
        deliveryLocationRange: {
          /*
          ES UN CUADRADO
          area: [
            {
              latitude: this.providerAddressLatitude -34.7115399,
              longitude: this.providerAddressLongitude -58.263918300
            },
            {
              latitude: this.providerAddressLatitude -34.7245401,
              longitude: this.providerAddressLongitude -58.26984170000001
            },
            {
              latitude: this.providerAddressLatitude -34.7238551,
              longitude: this.providerAddressLongitude -58.24828369999999
            },
            {
              latitude: this.providerAddressLatitude -34.7176918,
              longitude: this.providerAddressLongitude -58.2470774
            }
          ]
          */
        }
      }
      registerProvider(provider)
      this.close()
    },
    testEmail: function (mail) {
      const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return regex.test(mail)
    },
    testPhone: function (phone) {
      const regex = /^\d+$/
      return regex.test(phone)
    },
    setDescription (description) {
      this.description = description
    },
    setPlace (place) {
      this.place = place
    },
    usePlace (place) {
      this.setPlace(place)
      if (this.place) {
        this.markers.length = 0
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        })
        this.center = {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        }
      }
    }
  },
  computed: {
    validPhone: function () {
      return this.testPhone(this.customerPhone) && this.testPhone(this.customerPhonearea)
    },
    validEmail: function () {
      return this.testEmail(this.customerEmail)
    },
    validStep1: function () {
      return this.step1FieldsCompleted && this.validPhone && this.validEmail
    },
    step1FieldsCompleted: function () {
      return this.customerName !== '' && this.customerSurname !== '' && this.customerEmail !== '' && this.customerPassword !== '' && this.customerPhone !== '' && this.customerPhonearea !== '' && this.customerCuit !== ''
    },
    validStep2: function () {
      return this.validStep1 && this.place !== null
    },
    validStep1Provider: function () {
      return this.validProviderPhone && this.step1ProviderFieldsCompleted && this.validProviderEmail
    },
    validProviderPhone: function () {
      return this.testPhone(this.providerPhone) && this.testPhone(this.providerPhoneArea)
    },
    step1ProviderFieldsCompleted: function () {
      return this.providerName !== '' && this.providerEmail !== '' && this.providerPhone !== '' && this.providerPhoneArea !== '' && this.providerPassword !== ''
    },
    validStep2Provider: function () {
      return this.validStep1Provider && this.place !== null
    },
    validStep3Provider: function () {
      return this.validStep2Provider && this.providerLogo !== ''
    },
    validProviderEmail: function () {
      return this.testEmail(this.providerEmail)
    }
  }
}
</script>

<style>

.maps-autocomplete.md-input-container.md-theme-default input {
  font-size: 16px;
  color: black;
}
</style>
