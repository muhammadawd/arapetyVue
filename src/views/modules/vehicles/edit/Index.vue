<template>
  <vx-card>

    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('vehicle_key')" name="vehicle_key"
                    :danger="errors.has('vehicle_key')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.vehicle_key"/>
          <span class="text-danger text-sm" v-show="errors.has('vehicle_key')">{{ errors.first('vehicle_key') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('vehicle_license_plate')"
                    :danger="errors.has('vehicle_license_plate')" val-icon-danger="close"
                    name="vehicle_license_plate"
                    autocomplete="off" v-model="dataModel.vehicle_license_plate"/>
          <span class="text-danger text-sm"
                v-show="errors.has('vehicle_license_plate')">{{ errors.first('vehicle_license_plate') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|alpha'" class="w-full" :label="$t('color')" name="color"
                    :danger="errors.has('color')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.color"/>
          <span class="text-danger text-sm" v-show="errors.has('color')">{{ errors.first('color') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('vin')" name="vin"
                    :danger="errors.has('vin')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.vin"/>
          <span class="text-danger text-sm" v-show="errors.has('vin')">{{ errors.first('vin') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('vehicle_class')}}</label>
          <v-select label="title" :options="vehicleClasses" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.vehicle_class"/>
          <span class="text-danger text-sm" v-show="errors.has('vehicle_class_id')">{{ errors.first('vehicle_class_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/2 mb-2">
          <label class="vs-input--label">{{$t('vehicle_model')}}</label>
          <multiselect v-model="vehicle_model"
                       :options="vehicleBrands"
                       :multiple="false"
                       group-values="models"
                       group-label="title"
                       :group-select="false"
                       :placeholder="$t('search')"
                       track-by="id"
                       label="title">
            <template slot="singleLabel" slot-scope="props">
              <span class="option__desc">
                <span class="option__title">{{ props.option.$groupLabel ? props.option.$groupLabel : props.option.title }}</span>
              </span>
            </template>
            <template slot="option" slot-scope="props">
              <div class="flex">
                <img class="option__image mr-2 ml-2" v-if="props.option.image" width="30" :src="props.option.image"
                     alt="...">
                <div class="option__desc">
                  <span class="option__title">{{ props.option.$groupLabel ? props.option.$groupLabel : props.option.title }}</span>
                  <!--<span class="option__small">{{ props }}</span>-->
                </div>
              </div>
            </template>
          </multiselect>
          <span class="text-danger text-sm" v-show="errors.has('vehicle_model_id')">{{ errors.first('vehicle_model_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('year')}}</label>
          <v-select :options="years" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.year"/>
          <span class="text-danger text-sm" v-show="errors.has('year')">{{ errors.first('year') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('license_exp')}}</label>
          <flat-pickr v-validate="'required'" class="vs-inputx vs-input--input normal" name="license_exp"
                      v-model="dataModel.license_exp"></flat-pickr>
          <span class="text-danger text-sm" v-show="errors.has('license_exp')">{{ errors.first('license_exp') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('status')}}</label>
          <v-select label="name" :options="vehicleStatuses" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.status"/>
          <span class="text-danger text-sm" v-show="errors.has('status_id')">{{ errors.first('status_id') }}</span>
        </div>
        <div class="vx-col w-full mb-2">
          <label class="vs-input--label">{{$t('notes')}}</label>
          <vs-textarea class="w-full" name="notes"
                       autocomplete="off" v-model="dataModel.notes"/>
          <span class="text-danger text-sm" v-show="errors.has('notes')">{{ errors.first('notes') }}</span>
        </div>
        <div class="vx-col w-full">
          <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('edit')}}</vs-button>
        </div>
      </div>
    </form>
  </vx-card>
</template>


<script>
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    data() {
      return {
        vehicleClasses: [],
        vehicleBrands: [],
        vehicleStatuses: [],
        vehicle_model: null,
        dataModel: {
          branch_id: this.$helper.getCurrentBranch()
        }
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
            this.updateVehicle()
          } else {
            // form have errors
          }
        })
      },
      updateVehicle() {
        let vm = this;
        vm.$vs.loading();
        let request_data = vm.dataModel;
        request_data.vehicle_model_id = vm.vehicle_model ? vm.vehicle_model.id : '';
        request_data.status_id = request_data.status ? request_data.status.id : '';
        request_data.vehicle_class_id = request_data.vehicle_class ? request_data.vehicle_class.id : '';
        // delete request_data.vehicle_class;
        // delete request_data.status;

        let dispatch = this.$store.dispatch('moduleVehicle/updateVehicle', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-vehicles'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      getAllVehicleCommon() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCommon/fetchVehicleCommon', {});
        dispatch.then(() => {
          vm.vehicleBrands = this.$store.getters['moduleCommon/getAllVehicleBrands'];
          vm.vehicleClasses = this.$store.getters['moduleCommon/getAllVehicleClasses'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      getAllVehicleStatuses() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCommon/fetchStatuses', {});
        dispatch.then(() => {
          vm.vehicleStatuses = this.$store.getters['moduleCommon/getDriverStatuses'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      findVehicle() {
        let vm = this;
        vm.$vs.loading();
        let id = vm.$route.params.id;
        let dispatch = this.$store.dispatch('moduleVehicle/findVehicle', {id: id});
        dispatch.then((response) => {
          response = response.data;
          if (response.status) {
            vm.dataModel = response.data.vehicle;
            vm.vehicle_model = vm.dataModel.vehicle_model
          }
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
    },
    computed: {
      years() {
        const year = new Date().getFullYear()
        return Array.from({length: year - 1990}, (value, index) => 1991 + index)
      }
    },
    mounted() {
      let vm = this;
      vm.getAllVehicleCommon();
      vm.getAllVehicleStatuses();
      vm.findVehicle();
    }
  }
</script>
