<template>
  <div id="ag-grid-demo">
    <vx-card>
      <form>
        <vs-row>
          <div class="vx-col w-full md:w-1/2 p-2 mb-2">
            <label class="vs-input--label">{{$t('vehicle_model')}}</label>
            <multiselect v-model="selectedBrand"
                         :multiple="false"
                         :placeholder="''"
                         track-by="id"
                         :searchable="false"
                         :max-height="120"
                         :options="vehicleBrands"
                         :show-labels="false">
              <template slot="singleLabel" slot-scope="props">
                <div class="flex">
                  <img class="option__image" v-if="props.option.image_path" :src="props.option.image_path.path"
                       width="30"
                       alt="...">
                  <span class="option__desc p-1">
                  <span class="option__title">{{ props.option.title }}</span>
                </span>
                </div>
              </template>
              <template slot="option" slot-scope="props">
                <div class="flex">
                  <img class="option__image" v-if="props.option.image_path " :src="props.option.image_path.path"
                       width="40"
                       alt="...">
                  <span class="option__desc p-1">
                  <span class="option__title">{{ props.option.title }}</span>
                </span>
                </div>
              </template>
            </multiselect>
            <span class="text-danger text-sm" v-show="errors.has('brand_id')">{{ errors.first('brand_id') }}</span>
          </div>
          <div class="vx-col w-full md:w-1/4 p-2 mb-2">
            <vs-input v-validate="'required'" class="w-full" :label="$t('title')" name="title"
                      :danger="errors.has('title')" val-icon-danger="close"
                      autocomplete="off" v-model=" dataModel.title"/>
            <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>
          </div>
          <div class="vx-col w-full mt-2">
            <vs-button type="filled" size="small" :disabled="$helper.validateFormErrors(this)"
                       @click.prevent="submitForm"
                       class="mt-5 block">{{$t('add')}}
            </vs-button>
          </div>
        </vs-row>
      </form>
    </vx-card>

    <div v-if="vehicleBrands.length">
      <vs-tabs>
        <vs-tab v-for="(vehicleBrand,key) in vehicleBrands" :label="vehicleBrand.title">
          <vs-table>
            <template slot="thead">
              <vs-th width="100">#</vs-th>
              <vs-th>{{$t('vehicle_model')}}</vs-th>
            </template>

            <template>
              <slot v-for="(tr, indextr) in vehicleBrand.models" class="bg-white">
                <vs-tr class="bg-white">
                  <vs-td>
                    <div class="text-center">
                      <img src="" v-if="vehicleBrand.image_path" :src="vehicleBrand.image_path.path" width="40" alt="">
                    </div>
                  </vs-td>
                  <vs-td>
                    {{tr.title}}
                  </vs-td>
                </vs-tr>
                <vs-tr class="tr-spacer"></vs-tr>
              </slot>
            </template>
          </vs-table>
        </vs-tab>
      </vs-tabs>


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
        selectedBrand: null,
        dataModel: {},
        vehicleBrands: []
      }
    },
    methods: {
      getAllVehicleCommon() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCommon/fetchVehicleCommon', {});
        dispatch.then(() => {
          vm.vehicleBrands = this.$store.getters['moduleCommon/getAllVehicleBrands'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        let vm = this;
        vm.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            vm.addModel();
          } else {
            // form have errors
          }
        })
      },
      addModel() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        request_data.brand_id = vm.selectedBrand ? vm.selectedBrand.id : '';

        let dispatch = this.$store.dispatch('moduleVehicle/addModel', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          location.reload();
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
    },
    mounted() {
      let vm = this;
      vm.getAllVehicleCommon()
    }
  }
</script>
<style>
  .multiselect__content-wrapper {
    z-index: 99999 !important;
  }

  .vs-tabs-position-bottom .vs-tabs--ul, .vs-tabs-position-top .vs-tabs--ul {
    overflow-x: scroll;
  }
</style>
