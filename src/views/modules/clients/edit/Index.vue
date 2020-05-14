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
          <vs-input v-validate="'required|alpha'" class="w-full" :label="$t('last_name')" name="last_name"
                    :danger="errors.has('last_name')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.last_name"/>
          <span class="text-danger text-sm" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('phone')" name="phone"
                    :danger="errors.has('phone')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.phone"/>
          <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|email'" class="w-full" :label="$t('email')" name="email"
                    :danger="errors.has('email')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.email"/>
          <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="vx-col w-full mb-2">
          <label class="vs-input--label">{{$t('address')}}</label>
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
      'v-select': vSelect,flatPickr
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
