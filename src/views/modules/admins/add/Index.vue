<template>
  <vx-card>

    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|alpha'" class="w-full" :label="$t('name')" name="name"
                    :danger="errors.has('name')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.name"/>
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|alpha'" class="w-full" :label="$t('username')" name="username"
                    :danger="errors.has('username')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.username"/>
          <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('password')" name="password"
                    :danger="errors.has('password')" val-icon-danger="close" type="password"
                    autocomplete="off" v-model="dataModel.password"/>
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('branch')}}</label>
          <v-select :label="$t('branch')" :options="[]" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="dataModel.branch_id"/>
          <span class="text-danger text-sm" v-show="errors.has('branch_id')">{{ errors.first('branch_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('role')}}</label>
          <v-select :label="$t('role')" :options="[]" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="dataModel.role_id"/>
          <span class="text-danger text-sm" v-show="errors.has('role_id')">{{ errors.first('role_id') }}</span>
        </div>

        <div class="vx-col w-full">
          <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('add')}}</vs-button>
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
