<template>
  <vx-card>


    <vs-collapse>

      <vs-collapse-item icon-pack="feather" icon-arrow="icon-arrow-down">
        <div slot="header">
          <i class="fa fa-store"></i>
          {{$t('order_settings')}}
        </div>
        <form>
          <div class="vx-row mb-6">
            <div class="vx-col w-full md:w-1/3 mb-2" v-for="(setting , key) in settings" :key="key">
              <vs-input v-validate="'required'" class="w-full" :label="setting.title_ar"
                        :name="setting.name" :value="setting.value"
                        :danger="errors.has(setting.name)" val-icon-danger="close"
                        autocomplete="off" v-model="dataModel[setting.name] = setting.value"/>
              <span class="text-danger text-sm"
                    v-show="errors.has(setting.name)">{{ errors.first(setting.name) }}</span>
            </div>
            <div class="vx-col w-full">
              <vs-button type="filled" size="small" @click.prevent="submitForm" class="mt-5 block">{{$t('edit')}}
              </vs-button>
            </div>
          </div>
        </form>
      </vs-collapse-item>
      <vs-collapse-item icon-pack="feather" icon-arrow="icon-arrow-down">
        <div slot="header">
          <i class="fa fa-cog"></i>
          {{$t('main_settings')}}
        </div>

      </vs-collapse-item>
    </vs-collapse>
  </vx-card>
</template>


<script>
  export default {
    components: {},
    data() {
      return {
        dataModel: {},
        settings: null
      }
    },
    methods: {
      updateSettings() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        let dispatch = this.$store.dispatch('moduleCommon/updateSetting', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.updateSettings()
          } else {
            // form have errors
          }
        })
      },
      getAllSettings() {
        let vm = this;
        vm.$vs.loading()
        let dispatch = this.$store.dispatch('moduleCommon/fetchSettings');
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.settings = this.$store.getters['moduleCommon/getAllSettings'];
        }).catch(()=>{

          vm.$vs.loading.close()
        });
      }
    },
    mounted() {
      this.getAllSettings()
    }
  }

</script>

