<template>
  <vx-card>

    <form>
      <div class="vx-row mb-6">
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('title_ar')" name="title_ar"
                    :danger="errors.has('title_ar')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.title_ar"/>
          <span class="text-danger text-sm" v-show="errors.has('title_ar')">{{ errors.first('title_ar') }}</span>
        </div>
        <div class="vx-col w-full md:w-1/4 mb-2">
          <vs-input v-validate="'required'" class="w-full" :label="$t('title_en')" name="title_en"
                    :danger="errors.has('title_en')" val-icon-danger="close"
                    autocomplete="off" v-model=" dataModel.title_en"/>
          <span class="text-danger text-sm" v-show="errors.has('title_en')">{{ errors.first('title_en') }}</span>
        </div>
        <div class="vx-col w-full mb-2" v-if="permissions">
          <vs-tabs>
            <vs-tab v-for="(_permissions,key) in permissions" :label="key">
              <div class="tab-text">
                <ul class="switch-container demo-alignment">
                  <li v-for="(permission,_key) in _permissions" :key="_key">
                    <label>{{permission.translated.title}}</label>
                    <vs-switch v-model="myPermissions" :vs-value="permission.id"/>
                  </li>
                </ul>
              </div>
            </vs-tab>
          </vs-tabs>
        </div>

        <div class="vx-col w-full">
          <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('edit')}}
          </vs-button>
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
        permissions: null,
        myPermissions: [],
        dataModel: {
          branch_id: this.$helper.getCurrentBranch(),
          permission_ids: []
        }
      }
    },
    components: {
      'v-select': vSelect, flatPickr
    },
    methods: {
      updateRole() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        request_data.permission_ids = vm.myPermissions

        let dispatch = this.$store.dispatch('moduleRole/updateRole', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-roles'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      findRole() {
        let vm = this;
        vm.$vs.loading();
        let id = vm.$route.params.id;
        let dispatch = this.$store.dispatch('moduleRole/findRole', {id: id});
        dispatch.then((response) => {
          response = response.data;
          if (response.status) {
            let role = response.data.role;
            vm.dataModel = {
              id: role.id,
              branch_id: role.branch_id,
              title_ar: role.title_ar,
              title_en: role.title_en,
            };
            vm.myPermissions = _.map(response.data.role.permissions, 'id')
          }
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      getAllPermissions() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleRole/fetchPermission');
        dispatch.then(() => {
          vm.permissions = this.$store.getters['moduleRole/getAllPermissions'];
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
            this.updateRole();
          } else {
            // form have errors
          }
        })
      }
    },
    mounted() {
      this.getAllPermissions()
      this.findRole()
    }
  }
</script>
