<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">
          <div class="btn-group flex">
            <vs-button size="small" type="line" color="primary" icon-pack="feather" icon="icon-plus"
                       @click="$router.push({name:'add-captain'})">{{$t('add')}}
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

      <vs-table :data="captains">

        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th sort-key="phone">{{$t('phone')}}</vs-th>
          <vs-th sort-key="name">{{$t('name')}}</vs-th>
          <vs-th>{{$t('vehicle')}}</vs-th>
          <vs-th>{{$t('license_end_date')}}</vs-th>
          <vs-th>{{$t('username')}}</vs-th>
          <vs-th width="100"></vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">
            <vs-tr class="bg-white">
              <vs-td>
                <vs-button size="small" color="primary" icon-pack="feather" icon="icon-edit"
                           @click="$router.push({name:'edit-captain',params:{id:tr.id}})">{{$t('edit')}}
                </vs-button>
              </vs-td>
              <vs-td :data="data[indextr].phone">
                {{tr.phone}}
              </vs-td>
              <vs-td :data="data[indextr].first_name">
                {{ tr.first_name }} {{ tr.last_name }}
              </vs-td>
              <vs-td>
                {{tr.vehicle}}
              </vs-td>
              <vs-td>
                {{tr.license_end_date}}
              </vs-td>
              <vs-td>
                <div class="con-expand-users w-full">
                  <div class="con-btns-user flex items-center justify-between">
                    <div class="con-userx flex items-center justify-start">
                      <vs-avatar :badge="0" size="45px"
                                 :src="`https://randomuser.me/api/portraits/men/${indextr+9}.jpg`"/>
                      <span>{{ tr.username }}</span>
                    </div>
                  </div>
                </div>
              </vs-td>
              <vs-td>
                <div class="btn-group flex">
                  <vs-button type="line" size="small" color="danger" icon-pack="feather" icon="icon-trash"></vs-button>
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
        searchQuery: '',
        captains: []
      }
    },
    methods: {
      prepareFilters() {
        return {}
      }
    },
    mounted() {
      let vm = this;
      vm.$vs.loading()
      let filters = vm.prepareFilters();
      let dispatch = this.$store.dispatch('moduleCaptain/fetchCaptains', filters);
      dispatch.then(() => {
        vm.captains = this.$store.getters['moduleCaptain/getAllCaptains'];
        vm.$vs.loading.close()
      }).catch((error) => {
        vm.$helper.handleError(error,vm);
        vm.$vs.loading.close()
      });
    }
  }
</script>
