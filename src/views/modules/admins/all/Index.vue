<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="6">
          <div class="vx-row w-full  mb-6">
            <div class="vx-col w-full md:w-1/2 mb-2">
              <vs-input class="w-full" :label="$t('search')" name="search" @keyup.enter="submitFilter()"
                        autocomplete="off" v-model="query"/>
            </div>
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="6">
          <div class="btn-group flex">
            <vs-button size="small" type="line" color="primary" icon-pack="feather" icon="icon-plus"
                       @click="$router.push({name:'add-admin'})">{{$t('add')}}
            </vs-button>
            <vs-button size="small" type="line" color="rgb(62, 201, 214)" icon-pack="feather" @click="submitFilter()"
                       icon="icon-search">
              {{$t('filter')}}
            </vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vx-card>

    <div>

      <vs-table :data="admins">

        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th>{{$t('name')}}</vs-th>
          <vs-th>{{$t('username')}}</vs-th>
          <vs-th>{{$t('email')}}</vs-th>
          <vs-th>{{$t('phone')}}</vs-th>
          <vs-th>{{$t('role')}}</vs-th>
          <vs-th width="100"></vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">

            <vs-tr class="bg-white">
              <vs-td>
                <vs-button size="small" color="primary" icon-pack="feather" icon="icon-edit"
                           @click="$router.push({name:'edit-admin',params:{id:tr.id}})">{{$t('edit')}}
                </vs-button>
              </vs-td>
              <vs-td>
                {{tr.name}}
              </vs-td>
              <vs-td>
                {{tr.username}}
              </vs-td>
              <vs-td>
                {{tr.email}}
              </vs-td>
              <vs-td>
                {{tr.phone}}
              </vs-td>
              <vs-td>
                <slot v-if="tr.role">
                  {{tr.role.translated.title}}
                </slot>
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

    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        query: '',
        currentx: 1,
        pageTotal: 0,
        admins: []
      }
    },
    watch: {
      currentx: function (n, o) {
        this.getAllAdmins()
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
            let dispatch = vm.$store.dispatch('moduleAdmin/removeAdmin', {ids: [id]});
            dispatch.then(() => {
              vm.admins = vm.$store.getters['moduleAdmin/getAllAdmins'];
              vm.$vs.loading.close()
            }).catch((error) => {
              vm.$helper.handleError(error, vm);
              vm.$vs.loading.close()
            });
            return;
          }
        });
      },
      getAllAdmins() {
        let vm = this;
        vm.$vs.loading();
        let filters = vm.prepareFilters();
        let dispatch = this.$store.dispatch('moduleAdmin/fetchAdmin', filters);
        dispatch.then((response) => {
          response = response.data;
          vm.pageTotal = response.data.admins.last_page;
          vm.admins = this.$store.getters['moduleAdmin/getAllAdmins'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitFilter() {
        this.currentx = 1;
        this.getAllAdmins();
      },
      prepareFilters() {
        return {
          limit: 20,
          paginated: true,
          query: this.query,
          page: this.currentx
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllAdmins();
    }
  }
</script>

