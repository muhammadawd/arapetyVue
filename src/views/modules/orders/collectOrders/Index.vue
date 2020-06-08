<template>
  <div class="vx-row w-full  mb-6">
    <div class="vx-col w-full md:w-2/3 mb-2">
      <vx-card>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="6">
            <div class="vx-row w-full  mb-6">
              <div class="vx-col w-full md:w-2/3 mb-2">
                <label class="vs-input--label">{{$t('captain')}}</label>
                <vs-select v-model="driver_id">
                  <vs-select-item v-for="(item , k) in captains" :value="item.id"
                                  :text="(item.first_name + ' ' + item.last_name)"></vs-select-item>
                </vs-select>
              </div>
            </div>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="6">
            <div class="btn-group flex">
              <vs-button size="small" type="line" color="rgb(62, 201, 214)" icon-pack="feather" :disabled="!driver_id"
                         @click="findOrdersWithDriverId()"
                         icon="icon-search">
                {{$t('filter')}}
              </vs-button>
            </div>
          </vs-col>
        </vs-row>
      </vx-card>

      <vx-card class="mt-4">
        <vs-row>
          <vs-col vs-w="12">
            <vs-table :data="orders">

              <template slot="thead">
                <vs-th>{{$t('client')}}</vs-th>
                <vs-th>{{$t('office_cost')}}</vs-th>
                <vs-th>{{$t('driver_cost')}}</vs-th>
                <vs-th>{{$t('date')}}</vs-th>
              </template>

              <template slot-scope="{data}">
                <slot v-for="(tr, indextr) in data" class="bg-white">
                  <vs-tr class="bg-white">
                    <vs-td>
                      {{tr.user ? tr.user.phone : ''}}
                    </vs-td>
                    <vs-td>
                      {{tr.collect_values.office}}
                    </vs-td>
                    <vs-td>
                      {{tr.collect_values.driver}}
                    </vs-td>
                    <vs-td>
                      {{tr.created_at}}
                    </vs-td>
                  </vs-tr>
                  <vs-tr class="tr-spacer"></vs-tr>
                </slot>
              </template>
            </vs-table>
          </vs-col>
        </vs-row>
      </vx-card>
    </div>
    <div class="vx-col w-full md:w-1/3 mb-2">
      <vx-card>
        <vs-row>
          <vs-col vs-w="12">
            <h4 v-if="!collect_values" class="text-center text-bold">
              {{$t('no_data')}}
            </h4>
            <vs-table v-if="collect_values" :data="{}">
              <template>

                <vs-tr class="bg-danger text-white">
                  <vs-td>
                    <b>{{ $t('driver_cost') }}</b>
                  </vs-td>
                  <vs-td>
                    {{collect_values.driver}}
                  </vs-td>
                </vs-tr>
                <vs-tr class="tr-spacer"></vs-tr>

                <vs-tr class="bg-primary text-white">
                  <vs-td>
                    <b>{{ $t('office_cost') }}</b>
                  </vs-td>
                  <vs-td>
                    {{collect_values.office}}
                  </vs-td>
                </vs-tr>
                <vs-tr class="tr-spacer"></vs-tr>

                <vs-tr class="bg-white">
                  <vs-td>
                    <b>{{ $t('orders_count') }}</b>
                  </vs-td>
                  <vs-td>
                    {{collect_values.orders_count}}
                  </vs-td>
                </vs-tr>
                <vs-tr class="tr-spacer"></vs-tr>

                <vs-tr class="bg-white">
                  <vs-td>
                    <b>{{ $t('total_orders') }}</b>
                  </vs-td>
                  <vs-td>
                    {{collect_values.total}}
                  </vs-td>
                </vs-tr>
                <vs-tr class="tr-spacer"></vs-tr>

              </template>
            </vs-table>

            <vs-button class="mt-3" style="width: 100%" :disabled="!orders.length" @click="collectOrders()">
              {{$t('collect_orders')}}
            </vs-button>
          </vs-col>
        </vs-row>
      </vx-card>
    </div>
  </div>
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
        driver_id: '',
        captains: [],
        orders: [],
        collect_values: null,
        driver_fines: [],
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      getAllCaptains() {
        let vm = this;
        vm.$vs.loading();
        let filters = {};
        let dispatch = this.$store.dispatch('moduleCaptain/fetchCaptains', filters);
        dispatch.then((response) => {
          vm.captains = this.$store.getters['moduleCaptain/getAllCaptains'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      findOrdersWithDriverId() {
        let vm = this;
        vm.$vs.loading();
        let driver_id = vm.driver_id;
        let dispatch = this.$store.dispatch('moduleOrder/findOrdersWithDriverId', {driver_id: driver_id});
        dispatch.then((response) => {
          response = response.data;
          if (response.status) {
            console.log(response.data.data.orders)
            console.log(response.data.data.collect_values)
            console.log(response.data.data.driver_fines)
            vm.orders = response.data.data.orders
            vm.driver_fines = response.data.data.driver_fines
            vm.collect_values = response.data.data.collect_values
          }
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      collectOrders() {
        let vm = this;
        let order_ids = _.map(vm.orders, 'id');
        let payload = {
          driver_id: vm.driver_id,
          order_ids: order_ids
        }
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleOrder/collectOrders', payload);
        dispatch.then((response) => {
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all_transactions'})
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
        console.log(payload)
      }
    },
    mounted() {
      this.getAllCaptains();
    }
  }
</script>
