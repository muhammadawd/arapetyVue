<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="6">
          <div class="vx-row w-full  mb-6">
            <div class="vx-col w-full md:w-1/3 mb-2">
              <label class="vs-input--label">{{$t('status')}}</label>
              <vs-select v-model="status_id">
                <vs-select-item v-for="(item , k) in orderStatuses" :value="item.id"
                                :text="item.translated.title"></vs-select-item>
              </vs-select>
            </div>
            <div class="vx-col w-full md:w-2/3 mb-2">
              <vs-input class="w-full" :label="$t('search')" name="search" @keyup.enter="submitFilter()"
                        autocomplete="off" v-model="query"/>
            </div>
            <div class="vx-col w-full mb-2">
              <label class="vs-input--label">{{$t('date')}}</label>
              <flat-pickr class="vs-inputx vs-input--input normal"
                          :value="new Date()"
                          v-model="date_range"
                          ref="dateRange"
                          :config="flatPickrConfig"/>
            </div>
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="6">
          <div class="btn-group flex">
            <!--<vs-button size="small" type="line" color="primary" icon-pack="feather" icon="icon-plus"-->
            <!--@click="$router.push({name:'add-client'})">{{$t('add')}}-->
            <!--</vs-button>-->
            <vs-button size="small" type="line" color="rgb(62, 201, 214)" icon-pack="feather" @click="submitFilter()"
                       icon="icon-search">
              {{$t('filter')}}
            </vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vx-card>

    <div>

      <vs-table :data="orders">

        <template slot="thead">
          <vs-th width="100px">#</vs-th>
          <vs-th>{{$t('captain')}}</vs-th>
          <vs-th>{{$t('client')}}</vs-th>
          <vs-th>{{$t('status')}}</vs-th>
          <vs-th>{{$t('cost')}}</vs-th>
          <vs-th>{{$t('address')}}</vs-th>
          <vs-th>{{$t('date')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">
            <vs-tr class="bg-white">
              <vs-td>
                <vs-button size="small" color="light" icon-pack="feather" icon="icon-eye" class="text-black"
                           @click="$router.push({name:'show-order',params:{id:tr.id}})">
                  <span>{{$t('show')}}</span>
                </vs-button>
              </vs-td>
              <vs-td>
                {{tr.driver ? tr.driver.first_name : ''}}
                {{tr.driver ? tr.driver.last_name : ''}}
              </vs-td>
              <vs-td>
                {{tr.user ? tr.user.name : ''}} -
                {{tr.user ? tr.user.phone : ''}}
              </vs-td>
              <vs-td>
                <div class="con-vs-chip ml-auto mr-4 vs-chip-red con-color"
                     style="background: #887eec; color: rgba(255, 255, 255, 0.9);">
                  <span class="text-chip vs-chip--text">{{tr.status ? tr.status.translated.title : ''}}  </span>
                </div>
              </vs-td>
              <vs-td>
                {{tr.total_price}}
              </vs-td>
              <vs-td>
                {{tr.start_address}} -
                {{tr.end_address}}
              </vs-td>
              <vs-td>
                {{tr.created_at}}
              </vs-td>
            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>
          </slot>
        </template>
      </vs-table>

      <div class="grid-xs mt-2" v-if="pageTotal && currentx">
        <vs-pagination :total="pageTotal" v-model="currentx" goto></vs-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    components: {flatPickr},
    data() {
      return {
        start_date: '',
        end_date: '',
        date_range: '',
        flatPickrConfig: {
          dateFormat: "Y-m-d",
          mode: 'range',
          maxDate: "today",
        },
        query: '',
        currentx: 1,
        pageTotal: 0,
        orders: [],
        orderStatuses: [],
        status_id: '',
      }
    },
    watch: {
      currentx: function (n, o) {
        this.getAllOrders()
      },
      date_range: function (n, o) {

        let start_date = null;
        let end_date = null;

        if (n) {
          let arr = n.split(" to ");
          start_date = arr[0];
          end_date = arr[1] ? arr[1] : arr[0];
        }

        this.start_date = start_date;
        this.end_date = end_date;

      },
    },
    methods: {
      getAllOrders() {
        let vm = this;
        vm.$vs.loading();
        let filters = vm.prepareFilters();
        let dispatch = this.$store.dispatch('moduleOrder/fetchOrders', filters);
        dispatch.then((response) => {
          response = response.data;
          vm.pageTotal = response.data.orders.last_page;
          vm.orders = this.$store.getters['moduleOrder/getAllOrders'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      getAllOrderStatuses() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCommon/fetchStatuses', {});
        dispatch.then(() => {
          vm.orderStatuses = this.$store.getters['moduleCommon/getOrderStatuses'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitFilter() {
        this.currentx = 1;
        this.getAllOrders();
      },
      prepareFilters() {

        return {
          limit: 5,
          paginated: true,
          start_date: this.start_date,
          end_date: this.end_date,
          query: this.query,
          page: this.currentx,
          status_id: this.status_id
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllOrderStatuses();
      vm.getAllOrders();
    }
  }
</script>
