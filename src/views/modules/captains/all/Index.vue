<template>
  <div id="ag-grid-demo">
    <vx-card>

      <vs-table :data="captains">

        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th>{{$t('name')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr  v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{data[indextr].id}}
            </vs-td>
            <vs-td :data="data[indextr].title">
              {{data[indextr].title}}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

    </vx-card>
  </div>
</template>

<script>
  import {AgGridVue} from "ag-grid-vue"
  import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

  export default {
    components: {
      AgGridVue
    },
    data() {
      return {
        captains: []
      }
    },
    mounted() {
      let vm = this;
      console.log(vm.$t('captain'))
      let dispatch = this.$store.dispatch('moduleCaptain/fetchCaptains');
      dispatch.then(() => {
        vm.captains = this.$store.getters['moduleCaptain/getAllCaptains'];
      });
    }
  }
</script>
