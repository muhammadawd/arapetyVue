<template>
  <div id="ag-grid-demo">
    <div class="vx-row mb-6">
      <div class="vx-col w-full md:w-1/3 mb-2">
        <vx-card>
          <div class="vs-content-sidebar sidebarx main-menu-sidebar items-no-padding"
               style="overflow: hidden">
            <div class="vs-sidebar" style="position:relative; min-width: 220px;z-index:9">
              <ul class="vs-sidebar-group-items" style="max-height: none;">

                <li v-for="(captain , key) in captains" :key="key">
                  <div class="vs-sidebar--item">
                    <div class="p-3" style="cursor: pointer;"
                         :class="{'vs-sidebar--item vs-sidebar-item-active':true}"
                         target="_self">
                                    <span class="feather-icon select-none relative w-3 h-3">
                                      <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4"/>
                                    </span>
                      <span class="truncate p-2">{{captain.first_name}} {{captain.last_name}}</span>
                      <div class="badge badge-danger" style="float:left">
                        <div class="truncate bg-danger"
                             style="width: 10px;height: 10px;border-radius: 50%"
                             :class="'chat-captain-'+captain.id"></div>
                      </div>
                    </div>
                    <vs-divider class="m-0"></vs-divider>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-2/3 mb-2">
        <vx-card>
          ..
        </vx-card>
      </div>
    </div>


  </div>
</template>


<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        active: false,
        captains: [],
      }
    },
    computed: {},
    components: {},
    mounted() {
      this.getAllCaptains()
    },
    methods: {
      getAllCaptains() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCaptain/fetchCaptains', {});
        dispatch.then((response) => {
          vm.captains = this.$store.getters['moduleCaptain/getAllCaptains'];
          vm.$vs.loading.close()
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
    },
  }
</script>
