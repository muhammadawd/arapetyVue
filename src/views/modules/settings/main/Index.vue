<template>
  <vx-card>

    <form>

      <vs-collapse>

        <vs-collapse-item icon-pack="feather" icon-arrow="icon-arrow-down">
          <div slot="header">
            <i class="fa fa-store"></i>
            {{$t('order_settings')}}
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full md:w-1/4 mb-2">
              <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('order_fixed_value')" name="order_fixed_value"
                        :danger="errors.has('order_fixed_value')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.order_fixed_value"/>
              <span class="text-danger text-sm" v-show="errors.has('order_fixed_value')">{{ errors.first('order_fixed_value') }}</span>
            </div>

            <div class="vx-col w-full md:w-1/4 mb-2">
              <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('permit_time')" name="permit_time"
                        :danger="errors.has('permit_time')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.permit_time"/>
              <span class="text-danger text-sm" v-show="errors.has('permit_time')">{{ errors.first('permit_time') }}</span>
            </div>

            <div class="vx-col w-full md:w-1/4 mb-2">
              <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('out_location_value')" name="out_location_value"
                        :danger="errors.has('out_location_value')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.out_location_value"/>
              <span class="text-danger text-sm" v-show="errors.has('out_location_value')">{{ errors.first('out_location_value') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full md:w-1/4 mb-2">
              <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('before_km_cost')" name="before_km_cost"
                        :danger="errors.has('before_km_cost')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.before_km_cost"/>
              <span class="text-danger text-sm" v-show="errors.has('before_km_cost')">{{ errors.first('before_km_cost') }}</span>
            </div>

            <div class="vx-col w-full md:w-1/4 mb-2">
              <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('after_km_cost')" name="after_km_cost"
                        :danger="errors.has('after_km_cost')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.after_km_cost"/>
              <span class="text-danger text-sm" v-show="errors.has('after_km_cost')">{{ errors.first('after_km_cost') }}</span>
            </div>

            <div class="vx-col w-full md:w-1/4 mb-2">
              <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('before_time_cost')" name="before_time_cost"
                        :danger="errors.has('before_time_cost')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.before_time_cost"/>
              <span class="text-danger text-sm" v-show="errors.has('before_time_cost')">{{ errors.first('before_time_cost') }}</span>
            </div>

            <div class="vx-col w-full md:w-1/4 mb-2">
              <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('after_time_cost')" name="after_time_cost"
                        :danger="errors.has('after_time_cost')" val-icon-danger="close"
                        autocomplete="off" v-model=" dataModel.after_time_cost"/>
              <span class="text-danger text-sm" v-show="errors.has('after_time_cost')">{{ errors.first('after_time_cost') }}</span>
            </div>


            <div class="vx-col w-full">
              <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('edit')}}</vs-button>
            </div>
          </div>
        </vs-collapse-item>
        <vs-collapse-item icon-pack="feather" icon-arrow="icon-arrow-down" open>
          <div slot="header">
            <i class="fa fa-cog"></i>
            {{$t('main_settings')}}
          </div>
          tab 2. ..
        </vs-collapse-item>
      </vs-collapse>
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
