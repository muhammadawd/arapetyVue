<template>
  <vx-card>

    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('promo_code')" name="promo_code"
                    :danger="errors.has('promo_code')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.promo_code"/>
          <span class="text-danger text-sm" v-show="errors.has('promo_code')">{{ errors.first('promo_code') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('type')}}</label>
          <v-select :label="$t('type')" :options="[]" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="dataModel.type"/>
          <span class="text-danger text-sm" v-show="errors.has('type')">{{ errors.first('type') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('value')" name="value"
                    :danger="errors.has('value')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.value"/>
          <span class="text-danger text-sm" v-show="errors.has('value')">{{ errors.first('value') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('used_times')" name="used_times"
                    :danger="errors.has('used_times')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.used_times"/>
          <span class="text-danger text-sm" v-show="errors.has('used_times')">{{ errors.first('used_times') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('expired_at')}}</label>
          <flat-pickr class="vs-inputx vs-input--input normal" v-model="dataModel.expired_at"></flat-pickr>
          <span class="text-danger text-sm" v-show="errors.has('expired_at')">{{ errors.first('expired_at') }}</span>
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
        dataModel: {
          first_name: "",
          last_name: "",
          username: "",
          password: "",
          phone: "",
          ssn: "",
          age: "",
          office_percent: 0,
          max_cost: 0,
          notes: "",
          vehicle_id: "",
          status_id: "",
          branch_id: "",
          license_end_date: "",
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
            alert("form submitted!");
          } else {
            // form have errors
          }
        })
      }
    },
  }
</script>
