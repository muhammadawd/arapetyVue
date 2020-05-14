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
        <div class="vx-col w-full mb-2">
          <vs-tabs>
            <vs-tab label="المستخدمين">
              <div class="tab-text">
                <ul class="switch-container demo-alignment">
                  <li>
                    <label> تجريبي 1</label>
                    <vs-switch v-model="dataModel.permissions" value="1"/>
                  </li>
                  <li>
                    <label> تجريبي 1</label>
                    <vs-switch v-model="dataModel.permissions" value="1"/>
                  </li>
                  <li>
                    <label> تجريبي 1</label>
                    <vs-switch v-model="dataModel.permissions" value="1"/>
                  </li>
                </ul>
              </div>
            </vs-tab>
            <vs-tab label="الطلبات">
              <div class="tab-text">
                <ul class="switch-container demo-alignment">
                  <li>
                    <label> تجريبي 1</label>
                    <vs-switch v-model="dataModel.permissions" value="1"/>
                  </li>
                  <li>
                    <label> تجريبي 1</label>
                    <vs-switch v-model="dataModel.permissions" value="1"/>
                  </li>
                  <li>
                    <label> تجريبي 1</label>
                    <vs-switch v-model="dataModel.permissions" value="1"/>
                  </li>
                </ul>
              </div>
            </vs-tab>
          </vs-tabs>
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
          permissions: [],
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
