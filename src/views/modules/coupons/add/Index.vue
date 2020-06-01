<template>
  <vx-card>

    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('promo_code')" name="code"
                    :danger="errors.has('code')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.code"/>
          <span class="text-danger text-sm" v-show="errors.has('code')">{{ errors.first('code') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('type')}}</label>
          <v-select :label="$t('label')" :options="types" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.type"/>
          <span class="text-danger text-sm" v-show="errors.has('type')">{{ errors.first('type') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('value')" name="value"
                    :danger="errors.has('value')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.value"/>
          <span class="text-danger text-sm" v-show="errors.has('value')">{{ errors.first('value') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input  class="w-full" :label="$t('max_cost')" name="max_cost"
                    :danger="errors.has('max_cost')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.max_cost"/>
          <span class="text-danger text-sm" v-show="errors.has('max_cost')">{{ errors.first('max_cost') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric'" class="w-full" :label="$t('used_times')" name="used_times"
                    :danger="errors.has('used_times')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.used_times"/>
          <span class="text-danger text-sm" v-show="errors.has('used_times')">{{ errors.first('used_times') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('expired_at')}}</label>
          <flat-pickr v-validate="'required'" name="expired_at" class="vs-inputx vs-input--input normal"
                      v-model="dataModel.expired_at"></flat-pickr>
          <span class="text-danger text-sm" v-show="errors.has('expired_at')">{{ errors.first('expired_at') }}</span>
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
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';


  export default {
    data() {
      return {
        // types: [
        //   {label: 'value', value: 'value'},
        //   {label: 'percent', value: 'percent'},
        //   {label: 'fixed', value: 'fixed'},
        // ],
        types: ['value', 'percent', 'fixed'],
        dataModel: {}
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      addCoupon() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        // request_data.type = request_data.type_object ? request_data.type_object.value : '';

        let dispatch = this.$store.dispatch('moduleCoupon/addCoupon', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-coupons'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.addCoupon()
          } else {
            // form have errors
          }
        })
      }
    },
  }
</script>
