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

              <md-step md-label="Address" :md-continue="validStep2Provider" :md-disabled="!validStep1Provider" :md-error="!validStep2Provider">
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
              </md-step>

              <md-step md-label="Availability" :md-continue="validStep3Provider" :md-disabled="!validStep2Provider" :md-error="!validStep3Provider">
                <md-layout md-column md-gutter v-for="day in days" :key="day.day">
                  <label class="md-title">{{day.day}}</label>
                  <label class="md-subheading" v-for="av in day.availability">From {{av.startTime}} to {{av.endTime}}</label>
                  </br>
                  <div class="field-group">
                    <md-input-container>
                      <label for="startTime">Desde</label>
                      <md-select v-model="day.startTime" name="startTime" id="startTime">
                        <md-option v-for="(hour,index) in hours" :value="hour" :key="index">
                          {{hour}}
                        </md-option>
                      </md-select>
                    </md-input-container>

                    <md-input-container>
                      <label for="endTime">Hasta</label>
                      <md-select v-model="day.endTime" name="endTime" id="endTime">
                        <md-option v-for="(hour,index) in hours" :value="hour" :key="index">
                          {{hour}}
                        </md-option>
                      </md-select>
                    </md-input-container>
                  </div>
                  <md-button class="md-raised" @click="addAvailability(day)">Add</md-button>
                </md-layout>
              </md-step>

              <md-step md-label="Description" :md-continue="validStep4Provider" :md-disabled="!validStep3Provider" :md-error="!validStep4Provider">

                <md-input-container>
                  <label>Logo URL</label>
                  <md-input v-model="providerLogo" required></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Descripción</label>
                  <md-input v-model="providerDescription" maxlength="200"></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Website</label>
                  <md-input v-model="providerWebsite" maxlength="70"></md-input>
                </md-input-container>
              </md-step>

              <md-step md-label="Verify Information" :md-disabled="!validStep4Provider">
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
      providerWebsite: '',
      providerPassword: '',
      markers: [],
      place: null,
      center: {lat: -34.7068012, lng: -58.29490709999999},
      zoom: 16,
      days: [{ day: 'Monday', startTime: '', endTime: '', availability: [] },
      { day: 'Tuesday', startTime: '', endTime: '', availability: [] }, { day: 'Wednesday', startTime: '', endTime: '', availability: [] },
      { day: 'Thursday', startTime: '', endTime: '', availability: [] }, { day: 'Friday', startTime: '', endTime: '', availability: [] },
      { day: 'Saturday', startTime: '', endTime: '', availability: [] }, { day: 'Sunday', startTime: '', endTime: '', availability: [] }],
      hours: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
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
      const request = {
        user: {
          email: this.providerEmail,
          password: this.providerPassword
        },
        provider: {
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
            monday: this.getAvailability('Monday'),
            tuesday: this.getAvailability('Tuesday'),
            wednesday: this.getAvailability('Wednesday'),
            thursday: this.getAvailability('Thursday'),
            friday: this.getAvailability('Friday'),
            saturday: this.getAvailability('Saturday'),
            sunday: this.getAvailability('Sunday')
          },
          deliveryLocationRange: {
            area: [
              {
                latitude: -34.7115399,
                longitude: -58.263918300
              },
              {
                latitude: -34.7245401,
                longitude: -58.26984170000001
              },
              {
                latitude: -34.7238551,
                longitude: -58.24828369999999
              },
              {
                latitude: -34.7176918,
                longitude: -58.2470774
              }
            ]
          }
        }
      }
      console.log(request)
      registerProvider(request)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })

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
    },
    addAvailability (day) {
      day.availability.push({ startTime: day.startTime, endTime: day.endTime })
      day.startTime = ''
      day.endTime = ''
    },
    getAvailability (day) {
      var index = 0
      while (index < this.days.length) {
        if (day === this.days[index].day) {
          return this.days[index].availability
        }
        index++
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
      return this.validStep2Provider && this.anyAvailabilityChosen
    },
    validStep4Provider: function () {
      return this.validStep3Provider && this.providerLogo !== ''
    },
    validProviderEmail: function () {
      return this.testEmail(this.providerEmail)
    },
    anyAvailabilityChosen: function () {
      var index = 0
      while (index < this.days.length) {
        if (this.days[index].availability.length === 0) {
          return false
        }
        index++
      }
      return true
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
