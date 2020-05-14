<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">
          <div class="btn-group flex">
            <vs-button size="small" type="line" color="primary" icon-pack="feather" icon="icon-plus"
                       @click="$router.push({name:'add-admin'})">{{$t('add')}}
            </vs-button>
            <vs-button size="small" type="line" color="rgb(62, 201, 214)" class="mb-4 md:mb-0" icon-pack="feather"
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
          <vs-th>{{$t('name')}}</vs-th>
          <vs-th>{{$t('username')}}</vs-th>
          <vs-th>{{$t('phone')}}</vs-th>
          <vs-th width="100"></vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">
            <vs-tr class="bg-white">

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
        vehicles: []
      }
    },
    methods: {
      prepareFilters() {
        return {}
      }
    },
    mounted() {
      let vm = this;
      let filters = vm.prepareFilters();
      // let dispatch = this.$store.dispatch('moduleCaptain/fetchCaptains', filters);
      // dispatch.then(() => {
      //   vm.captains = this.$store.getters['moduleCaptain/getAllCaptains'];
      // });
    }
  }
</script>
