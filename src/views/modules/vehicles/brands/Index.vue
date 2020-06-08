<template>
  <div id="ag-grid-demo">
    <vx-card>
      <form>
        <vs-row>
          <div class="vx-col w-full md:w-1/4 mb-2">
            <vs-input v-validate="'required'" class="w-full" :label="$t('title')" name="title"
                      :danger="errors.has('title')" val-icon-danger="close"
                      autocomplete="off" v-model=" dataModel.title"/>
            <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>
          </div>
          <div class="vx-col w-full md:w-1/4">
            <label class="vs-input--label">{{$t('image')}}</label>
            <input v-validate="'required'" class="w-full vs-inputx vs-input--input m-2 mt-0" name="image"
                   accept="image/*"
                   ref="image"
                   v-on:change="handleFileUpload()" autocomplete="off" type="file"/>
            <span class="text-danger text-sm"
                  v-show="errors.has('image')">{{ errors.first('image') }}</span>
          </div>
          <div class="vx-col w-full mt-2">
            <vs-button type="filled" size="small" :disabled="$helper.validateFormErrors(this)"
                       @click.prevent="submitForm"
                       class="mt-5 block">{{$t('add')}}
            </vs-button>
          </div>
        </vs-row>
      </form>
    </vx-card>

    <div>

      <vs-table :data="vehicleBrands">

        <template slot="thead">
          <vs-th width="200">#</vs-th>
          <vs-th>{{$t('brands')}}</vs-th>
          <vs-th>{{$t('vehicle_model')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <slot v-for="(tr, indextr) in data" class="bg-white">
            <vs-tr class="bg-white">
              <vs-td :data="data[indextr].image">
                <div class="text-center">
                  <img src="" v-if="tr.image_path" :src="tr.image_path.path" width="40" alt="">
                </div>
              </vs-td>
              <vs-td :data="data[indextr].title">
                {{tr.title}}
              </vs-td>

              <vs-td :data="data[indextr].title">
                {{tr.models.length}}
              </vs-td>

            </vs-tr>
            <vs-tr class="tr-spacer"></vs-tr>
          </slot>
        </template>
      </vs-table>

    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        query: '',
        currentx: 1,
        pageTotal: 0,
        dataModel: {},
        vehicleBrands: []
      }
    },
    methods: {
      getAllVehicleCommon() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCommon/fetchVehicleCommon', {});
        dispatch.then(() => {
          vm.vehicleBrands = this.$store.getters['moduleCommon/getAllVehicleBrands'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      handleFileUpload() {
        let vm = this;
        vm.dataModel.image = vm.$refs.image.files[0];
      },
      submitForm() {
        let vm = this;
        vm.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            vm.addBrand();
          } else {
            // form have errors
          }
        })
      },
      addBrand() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        let form_data = new FormData();

        for (let [key, value] of Object.entries(request_data)) {
          form_data.append(key, value)
        }
        let dispatch = this.$store.dispatch('moduleVehicle/addBrand', form_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          location.reload();
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
    },
    mounted() {
      let vm = this;
      vm.getAllVehicleCommon()
    }
  }
</script>
