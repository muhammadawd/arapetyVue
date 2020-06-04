<template>
  <vx-card>

    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('name')" name="name"
                    :danger="errors.has('name')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.name"/>
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('gender')}}</label>
          <v-select :options="genders" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.gender"/>
          <span class="text-danger text-sm" v-show="errors.has('gender')">{{ errors.first('gender') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric|digits:11'" class="w-full" :label="$t('phone')" name="phone"
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
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input   class="w-full" :label="$t('password')" name="password" type="password"
                    :danger="errors.has('password')" val-icon-danger="close"
                    autocomplete="off" v-model="dataModel.password"/>
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
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
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    data() {
      return {
        genders: ['male', 'female'],
        dataModel: {}
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      findClient() {
        let vm = this;
        vm.$vs.loading();
        let id = vm.$route.params.id;
        let dispatch = this.$store.dispatch('moduleClient/findClient', {id: id});
        dispatch.then((response) => {
          response = response.data;
          if (response.status) {
            vm.dataModel = response.data.user;
          }
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      updateClient() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;

        let dispatch = this.$store.dispatch('moduleClient/updateClient', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-clients'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.updateClient();
          } else {
            // form have errors
          }
        })
      }
    },
    mounted() {
      this.findClient()
    }
  }
</script>
