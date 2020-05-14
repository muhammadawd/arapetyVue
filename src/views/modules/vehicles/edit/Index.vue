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
          <label class="vs-input--label">{{$t('year')}}</label>
          <v-select :label="$t('year')" :options="[]" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.year"/>
          <span class="text-danger text-sm" v-show="errors.has('year')">{{ errors.first('year') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('vehicle_class')}}</label>
          <v-select :label="$t('vehicle_class')" :options="[]" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.vehicle_class_id"/>
          <span class="text-danger text-sm" v-show="errors.has('vehicle_class_id')">{{ errors.first('vehicle_class_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('vehicle_model')}}</label>
          <v-select :label="$t('vehicle_model')" :options="[]" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.vehicle_model_id"/>
          <span class="text-danger text-sm" v-show="errors.has('vehicle_model_id')">{{ errors.first('vehicle_model_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('license_exp')}}</label>
          <flat-pickr class="vs-inputx vs-input--input normal" v-model="dataModel.license_exp"></flat-pickr>
          <span class="text-danger text-sm" v-show="errors.has('license_exp')">{{ errors.first('license_exp') }}</span>
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
  // For custom error message
  import {Validator} from 'vee-validate'
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';


  const dict = {
    custom: {
      first_name: {
        required: 'Please enter your first name',
        alpha: "Your first name may only contain alphabetic characters"
      },
      last_name: {
        required: 'Please enter your last name',
        alpha: "Your last name may only contain alphabetic characters"
      },
      username: {
        required: 'Please enter your username',
        alpha: "Your username may only contain alphabetic characters"
      },
      password: {
        required: 'Please enter your password',
      },
      phone: {
        required: 'Please enter your phone',
        numeric: "Your phone may only contain numbers"
      },
      ssn: {
        required: 'Please enter your ssn',
        digits: 'Your ssn must be 14 digits',
        numeric: "Your ssn may only contain numbers"
      },
    }
  };

  // register custom messages
  // Validator.localize('en', dict);

  export default {
    data() {
      return {
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
