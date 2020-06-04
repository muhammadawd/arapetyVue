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
          <vs-input v-validate="'required|email'" class="w-full" :label="$t('email')" name="email"
                    :danger="errors.has('email')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.email"/>
          <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required|numeric|digits:11'" class="w-full" :label="$t('phone')" name="phone"
                    :danger="errors.has('phone')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.phone"/>
          <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('branch')}}</label>
          <v-select label="name" :options="branches" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.branch"/>
          <span class="text-danger text-sm" v-show="errors.has('branch_id')">{{ errors.first('branch_id') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <label class="vs-input--label">{{$t('role')}}</label>
          <v-select label="title_ar" :options="roles" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    v-model="dataModel.role"/>
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
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    data() {
      return {
        roles: [],
        branches: [],
        dataModel: {}
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      addAdmin() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        request_data.role_id = request_data.role ? request_data.role.id : '';
        request_data.branch_id = request_data.branch ? request_data.branch.id : '';

        let dispatch = this.$store.dispatch('moduleAdmin/addAdmin', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-admins'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      getAllRoles() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleRole/fetchRole');
        dispatch.then((response) => {
          // response = response.data;
          // vm.pageTotal = response.data.roles.last_page;
          vm.roles = this.$store.getters['moduleRole/getAllRoles'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      getAllBranches() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleBranch/fetchBranch');
        dispatch.then((response) => {
          vm.branches = this.$store.getters['moduleBranch/getAllBranches'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.addAdmin();
          } else {
            // form have errors
          }
        })
      }
    },
    mounted() {
      this.getAllRoles();
      this.getAllBranches();
    }
  }
</script>

