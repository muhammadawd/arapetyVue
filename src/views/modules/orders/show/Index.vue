<template>
  <vx-card v-if="order">
    <div class="vx-row mb-6">
      <div class="vx-col w-full md:w-1/3 mb-2">
        <div class="vx-row mb-6" v-if="order.calculation">
          <div class="vx-col w-full md:w-1/2 mb-2">
            <span>
              <span> <b>{{$t('before_km')}}</b> <br> {{order.calculation.before_km}} {{$t('km')}}</span>
              <div class="vs-progress--background vs-progress-danger" style="height: 5px;">
                <div class="vs-progress--foreground" style="width: 80%;"></div>
              </div>
            </span>
          </div>
          <div class="vx-col w-full md:w-1/2 mb-2">
            <span>
              <span> <b>{{$t('after_km')}}</b> <br> {{order.calculation.after_km}} {{$t('km')}}</span>
              <div class="vs-progress--background vs-progress-success" style="height: 5px;">
                <div class="vs-progress--foreground" style="width: 80%;"></div>
              </div>
            </span>
          </div>
        </div>
        <div class="vx-row mb-6" v-if="order.calculation">
          <div class="vx-col w-full md:w-1/2 mb-2">
            <span>
              <span> <b>{{$t('before_time')}}</b> <br> {{order.calculation.before_time}} {{$t('mins')}}</span>
              <div class="vs-progress--background vs-progress-warning" style="height: 5px;">
                <div class="vs-progress--foreground" style="width: 40%;"></div>
              </div>
            </span>
          </div>
          <div class="vx-col w-full md:w-1/2 mb-2">
            <span>
              <span> <b>{{$t('after_time')}}</b> <br> {{order.calculation.after_time}} {{$t('mins')}}</span>
              <div class="vs-progress--background vs-progress-primary" style="height: 5px;">
                <div class="vs-progress--foreground" style="width: 60%;"></div>
              </div>
            </span>
          </div>
        </div>
        <div>
          <gmap-map ref="mapRef" v-bind:center="center" v-bind:zoom="12" style="width: 100%; height:300px"
                    :options="{styles:$helper.getMapDarkStyle()}">
            <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#f00'}">
            </gmap-polyline>
          </gmap-map>
        </div>
      </div>

      <div class="vx-col w-full md:w-2/3 mb-2">
        <vs-table :data="order">
          <template>
            <vs-tr class="bg-white">
              <vs-td>
                <b>{{ $t('captain') }}</b>
              </vs-td>
              <vs-td>
                {{ order.driver ? (order.driver.first_name + ' ' + order.driver.last_name) : '-' }}
              </vs-td>
            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>

            <vs-tr class="bg-white">
              <vs-td>
                <b>{{ $t('client') }}</b>
              </vs-td>
              <vs-td>
                {{ order.user ? (order.user.name) : '-' }}
              </vs-td>
            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>

            <vs-tr class="bg-white">
              <vs-td>
                <b>{{ $t('status') }}</b>
              </vs-td>
              <vs-td>
                <div class="con-vs-chip ml-auto mr-4 vs-chip-red con-color"
                     style="background: #887eec; color: rgba(255, 255, 255, 0.9);">
                  <span
                    class="text-chip vs-chip--text"> {{ order.status ? (order.status.translated.title) : '-' }}  </span>
                </div>
              </vs-td>
            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>

            <vs-tr class="bg-white">
              <vs-td>
                <b>{{ $t('cost') }}</b>
              </vs-td>
              <vs-td>
                {{ order.total_price }}
              </vs-td>
            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>


            <vs-tr class="bg-white">
              <vs-td>
                <b>{{ $t('address') }}</b>
              </vs-td>
              <vs-td>
                {{order.start_address}}
                -
                {{order.end_address}}
              </vs-td>
            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>


          </template>
        </vs-table>
      </div>
    </div>
  </vx-card>
</template>


<script>
  // For custom error message
  import vSelect from 'vue-select'
  import {Validator} from 'vee-validate'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    data() {
      return {
        order: {},
        center: {lat: 30.785497, lng: 30.999118},
        path: []
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      findOrder() {
        let vm = this;
        vm.$vs.loading();
        let id = vm.$route.params.id;
        let dispatch = this.$store.dispatch('moduleOrder/findOrder', {id: id});
        dispatch.then((response) => {
          response = response.data;
          if (response.status) {
            vm.order = response.data.order;
            vm.path = vm.order.locations;
            // console.log(vm.order.locations);
            if (vm.order.locations.length) {
              vm.center = vm.order.locations[0];
            }
            let center = vm.center;

            vm.$refs.mapRef.$mapPromise.then((map) => {
              map.panTo(center)
            })
          }
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      }
    },
    mounted() {
      this.findOrder()
    }
  }
</script>
