<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">
          <div class="btn-group flex">
            <vs-button size="small" type="line" color="primary" icon-pack="feather" icon="icon-plus"
                       @click="$router.push({name:'add-vehicle'})">{{$t('add')}}
            </vs-button>
            <vs-button size="small" type="line" color="rgb(62, 201, 214)" icon-pack="feather"
                       icon="icon-search">
              {{$t('filter')}}
            </vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vx-card>

    <div>

      <vs-table :data="vehicles">

        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th>{{$t('vehicle_class')}}</vs-th>
          <vs-th>{{$t('vehicle_model')}}</vs-th>
          <vs-th>{{$t('vehicle_key')}}</vs-th>
          <vs-th>{{$t('license_exp')}}</vs-th>
          <vs-th width="100"></vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">
            <vs-tr class="bg-white">
              <vs-td>
                <vs-button size="small" color="primary" icon-pack="feather" icon="icon-edit"
                           @click="$router.push({name:'edit-vehicle',params:{id:tr.id}})">{{$t('edit')}}
                </vs-button>
              </vs-td>
              <vs-td :data="data[indextr].vehicle_class">
                {{tr.vehicle_class.title}}
              </vs-td>
              <vs-td :data="data[indextr].vehicle_model">
                {{tr.vehicle_model.brand.title}} - {{tr.vehicle_model.title}}
              </vs-td>
              <vs-td :data="data[indextr].vehicle_key">
                {{tr.vehicle_key}}
              </vs-td>
              <vs-td :data="data[indextr].phone">
                {{tr.license_exp}}
              </vs-td>
              <vs-td>
                <div class="btn-group flex">
                  <vs-button type="line" size="small" color="danger" icon-pack="feather" icon="icon-trash"
                             @click="confirmDelete(tr.id)"></vs-button>
                </div>
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
  export default {
    components: {},
    data() {
      return {
        searchQuery: '',
        currentx: 1,
        pageTotal: 0,
        vehicles: []
      }
    },
    watch: {
      currentx: function (n, o) {
        this.getAllVehicles()
      },
    },
    methods: {
      confirmDelete(id) {
        let vm = this;
        vm.$swal({
          title: vm.$t('look_out'),
          text: vm.$t('are_sure'),
          showCancelButton: true,
          confirmButtonText: vm.$t('yes'),
          cancelButtonText: vm.$t('no'),
          buttonsStyling: true
        }).then(function (result) {
          if (result.isConfirmed) {
            vm.$vs.loading();
            let dispatch = vm.$store.dispatch('moduleVehicle/removeVehicle', {ids: [id]});
            dispatch.then(() => {
              vm.vehicles = vm.$store.getters['moduleVehicle/getAllVehicles'];
              vm.$vs.loading.close()
            }).catch((error) => {
              vm.$helper.handleError(error, vm);
              vm.$vs.loading.close()
            });
            return;
          }
        });

      },
      getAllVehicles() {
        let vm = this;
        vm.$vs.loading();
        let filters = vm.prepareFilters();
        let dispatch = this.$store.dispatch('moduleVehicle/fetchVehicles', filters);
        dispatch.then((response) => {
          response = response.data;
          vm.pageTotal = response.data.vehicles.last_page;
          vm.vehicles = this.$store.getters['moduleVehicle/getAllVehicles'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      prepareFilters() {
        return {
          limit: 20,
          paginated: true,
          page: this.currentx
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllVehicles();
    }
  }
</script>
