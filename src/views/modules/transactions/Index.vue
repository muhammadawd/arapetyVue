<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>

        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 m-1">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="CreditCardIcon"
            color='warning'
            :statistic="parseFloat(total_exports+total_imports).toFixed(3)"
            :statisticTitle="$t('transactions')"/>
        </div>
        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 m-1">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="ArrowDownIcon"
            color='danger'
            :statistic="parseFloat(total_imports).toFixed(3)"
            :statisticTitle="$t('imports')"/>
        </div>
        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 m-1">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="ArrowUpIcon"
            :statistic="parseFloat(total_exports).toFixed(3)"
            :statisticTitle="$t('exports')"/>
        </div>

        <!--<vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">-->
        <!--<div class="btn-group flex">-->
        <!--<vs-button size="small" type="line" color="rgb(62, 201, 214)" icon-pack="feather"-->
        <!--icon="icon-search">-->
        <!--{{$t('filter')}}-->
        <!--</vs-button>-->
        <!--</div>-->
        <!--</vs-col>-->
      </vs-row>
    </vx-card>

    <div>

      <vs-table :data="transactions">

        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th>{{$t('admin')}}</vs-th>
          <vs-th>{{$t('type')}}</vs-th>
          <vs-th>{{$t('cost')}}</vs-th>
          <vs-th>{{$t('date')}}</vs-th>
          <vs-th>{{$t('notes')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">
            <vs-tr class="bg-white">
              <vs-td>
                {{tr.id}}
              </vs-td>
              <vs-td>
                {{tr.admin ? tr.admin.name : ''}}
              </vs-td>
              <vs-td>
                <div v-if="tr.type == 'Export'" class="con-vs-chip ml-auto mr-4 vs-chip-red con-color"
                     style="background: #ea5455; color: rgba(255, 255, 255, 0.9);">
                  <span class="text-chip vs-chip--text">{{$t(tr.type)}}</span>
                </div>
                <div v-if="tr.type == 'Import'" class="con-vs-chip ml-auto mr-4 vs-chip-red con-color"
                     style="background: #8b81f2; color: rgba(255, 255, 255, 0.9);">
                  <span class="text-chip vs-chip--text">{{$t(tr.type)}}</span>
                </div>

              </vs-td>
              <vs-td>
                {{tr.cost}}
              </vs-td>
              <vs-td>
                {{tr.created_at}}
              </vs-td>
              <vs-td>
                {{tr.notes}}
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
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'


  export default {
    data() {
      return {
        transactions: [],
        query: '',
        total_imports: '',
        total_exports: '',
        currentx: 1,
        pageTotal: 0,
      }
    },
    components: {
      'v-select': vSelect, flatPickr, StatisticsCardLine
    },
    watch: {
      currentx: function (n, o) {
        this.getAllTransactions()
      },
    },
    methods: {
      getAllTransactions() {
        let vm = this;
        vm.$vs.loading();
        let filters = vm.prepareFilters();
        let dispatch = this.$store.dispatch('moduleTransaction/fetchTransactions', filters);
        dispatch.then((response) => {
          response = response.data;
          vm.pageTotal = response.data.transactions.last_page;
          vm.total_imports = response.data.total_imports;
          vm.total_exports = response.data.total_exports;

          vm.transactions = this.$store.getters['moduleTransaction/getAllTransactions'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      prepareFilters() {
        return {
          limit: 10,
          paginated: true,
          query: this.query,
          page: this.currentx
        }
      }
    },
    mounted() {
      this.getAllTransactions()
    }
  }
</script>
