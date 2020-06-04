<template>
  <div id="ag-grid-demo">
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">
          <div class="btn-group flex">
            <vs-button size="small" type="line" color="rgb(62, 201, 214)" icon-pack="feather"
                       icon="icon-search">
              {{$t('filter')}}
            </vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vx-card>

    <div>

      <vs-table :data="transactions">

        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th>{{$t('captain')}}</vs-th>
          <vs-th>{{$t('client')}}</vs-th>
          <vs-th>{{$t('cost')}}</vs-th>
          <vs-th>{{$t('address')}}</vs-th>
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
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';


  export default {
    data() {
      return {
        transactions: [],
        dataModel: {}
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            alert("form submitted!");
          } else {
            // form have errors
          }
        })
      }
    },
  }
</script>
