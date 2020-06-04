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
        <div class="vx-col w-full md:w-3/4 mb-2">
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label class="vs-input--label">{{$t('location_tags')}}</label>
            <vue-tags-input
              v-model="location_tag"
              :tags="location_tags"
              name="location_tags"
              class="w-full"
              placeholder=""
              :danger="errors.has('location_tags')" val-icon-danger="close"
              @tags-changed="newTags => location_tags = newTags"
            />
            <span class="text-danger text-sm"
                  v-show="errors.has('location_tags')">{{ errors.first('location_tags') }}</span>
          </div>
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
  // For custom error message
  import vSelect from 'vue-select'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import VueTagsInput from '@johmun/vue-tags-input';

  export default {
    data() {
      return {
        location_tag: '',
        location_tags: [],
        dataModel: {}
      }
    },
    components: {
      'v-select': vSelect, flatPickr, VueTagsInput
    },
    methods: {
      findBranch() {
        let vm = this;
        vm.$vs.loading();
        let id = vm.$route.params.id;
        let dispatch = this.$store.dispatch('moduleBranch/findBranch', {id: id});
        dispatch.then((response) => {
          response = response.data;
          if (response.status) {
            vm.dataModel = response.data.branch;
            vm.location_tags = _.map(response.data.branch.location_tags, (tag) => {
              return {
                text: tag,
                tiClasses: ["ti-valid"]
              }
            })
          }
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      updateBranch() {
        let vm = this;
        vm.$vs.loading()
        let request_data = vm.dataModel;
        request_data.location_tags = _.map(vm.location_tags, 'text');
        // request_data.type = request_data.type_object ? request_data.type_object.value : '';

        let dispatch = this.$store.dispatch('moduleBranch/updateBranch', request_data);
        dispatch.then(() => {
          vm.$vs.loading.close()
          vm.$helper.showMessage('success', vm)
          vm.$router.push({name: 'all-branches'})
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // if form have no errors
            this.updateBranch();
          } else {
            // form have errors
          }
        })
      }
    },
    mounted() {
      this.findBranch();
    }
  }
</script>
