<template>
  <vx-card>

    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|alpha'" class="w-full" :label="$t('first_name')" name="first_name"
                    :danger="errors.has('first_name')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.first_name"/>
          <span class="text-danger text-sm" v-show="errors.has('first_name')">{{ errors.first('first_name') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('last_name')" name="last_name"
                    :danger="errors.has('last_name')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.last_name"/>
          <span class="text-danger text-sm" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric|digits:11'" class="w-full" :label="$t('phone')" name="phone"
                    :danger="errors.has('phone')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.phone"/>
          <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('age')" name="age"
                    :danger="errors.has('age')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.age"/>
          <span class="text-danger text-sm" v-show="errors.has('age')">{{ errors.first('age') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('username')" name="username"
                    :danger="errors.has('username')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.username"/>
          <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('password')" name="password" type="password"
                    :danger="errors.has('password')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.password"/>
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric|digits:14'" class="w-full" :label="$t('ssn')" name="ssn"
                    :danger="errors.has('ssn')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.ssn"/>
          <span class="text-danger text-sm" v-show="errors.has('ssn')">{{ errors.first('ssn') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('max_cost')" name="max_cost"
                    :danger="errors.has('max_cost')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.max_cost"/>
          <span class="text-danger text-sm" v-show="errors.has('max_cost')">{{ errors.first('max_cost') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('office_percent')" name="office_percent"
                    :danger="errors.has('office_percent')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.office_percent"/>
          <span class="text-danger text-sm"
                v-show="errors.has('office_percent')">{{ errors.first('office_percent') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('status')}}</label>
          <v-select label="name" :options="driverStatuses" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.status"/>
          <span class="text-danger text-sm" v-show="errors.has('status_id')">{{ errors.first('status_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('vehicle')}}</label>
          <v-select label="vehicle_key" :options="vehicles" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.vehicle"/>
          <span class="text-danger text-sm" v-show="errors.has('vehicle_id')">{{ errors.first('vehicle_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('license_end_date')}}</label>
          <flat-pickr class="vs-inputx vs-input--input normal" v-model="dataModel.license_end_date"></flat-pickr>
          <span class="text-danger text-sm" v-show="errors.has('license_end_date')">{{ errors.first('license_end_date') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4">
          <label class="vs-input--label">{{$t('image')}}</label>
          <input class="w-full vs-inputx vs-input--input normal" name="image" accept="image/*" ref="image"
                 v-on:change="handleFileUpload()" autocomplete="off" type="file"/>
          <span class="text-danger text-sm"
                v-show="errors.has('image')">{{ errors.first('image') }}</span>
        </div>
        <div class="vx-col w-full md:w-3/4">
          <label class="vs-input--label">{{$t('notes')}}</label>
          <vs-textarea class="w-full" name="notes"
                       autocomplete="off" v-model="dataModel.notes"/>
          <span class="text-danger text-sm" v-show="errors.has('notes')">{{ errors.first('notes') }}</span>
          <span class="text-danger text-sm" v-show="errors.has('branch_id')">{{ errors.first('branch_id') }}</span>
        </div>
        <div class="vx-col w-full mt-2">
          <vs-button type="filled" size="small" :disabled="$helper.validateFormErrors(this)" @click.prevent="submitForm"
                     class="mt-5 block">{{$t('add')}}
          </vs-button>
        </div>
      </div>
    </form>
  </vx-card>
</template>


<script>
  // For custom error message
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    data() {
      return {
        driverStatuses: [],
        vehicles: [],
        dataModel: {
          branch_id: this.$helper.getCurrentBranch()
        }
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      addCaptain() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        request_data.status_id = request_data.status ? request_data.status.id : '';
        request_data.vehicle_id = request_data.vehicle ? request_data.vehicle.id : '';
        delete request_data.status;
        delete request_data.vehicle;
        let form_data = new FormData();

        for (let [key, value] of Object.entries(request_data)) {
          form_data.append(key, value)
        }

        let dispatch = this.$store.dispatch('moduleCaptain/addCaptain', form_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-captains'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      handleFileUpload() {
        let vm = this;
        vm.dataModel.image = vm.$refs.image.files[0];
      },
      submitForm() {
        let vm = this;
        vm.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            vm.addCaptain();
          } else {
            // form have errors
          }
        })
      },
      getAllDriverStatuses() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCommon/fetchStatuses', {});
        dispatch.then(() => {
          vm.driverStatuses = this.$store.getters['moduleCommon/getDriverStatuses'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      getAllVehicles() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleVehicle/fetchVehicles', {});
        dispatch.then(() => {
          vm.vehicles = this.$store.getters['moduleVehicle/getAllVehicles'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
    },
    mounted() {
      let vm = this;
      vm.getAllDriverStatuses();
      vm.getAllVehicles();
    }
  }
</script>
