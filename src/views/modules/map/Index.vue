<template>
  <div id="ag-grid-demo">
    <vs-button style="margin: 0" size="small" @click="rightVal  == 0 ? rightVal='-100%' : rightVal=0">
      <i class="fas fa-bars"></i>
      {{$t('captains')}}
    </vs-button>
    <div class="vx-row mb-6 relative">
      <div class="vx-col w-full transition  md:w-1/3 mb-2" style="position: absolute;z-index: 99;"
           :style="{right:`${rightVal} !important`}">
        <vx-card>
          <div class="vs-content-sidebar sidebarx main-menu-sidebar items-no-padding"
               style="overflow: hidden;">
            <vs-input class="w-full" :placeholder="$t('search')" @keyup.enter="filterDrivers()" v-model="querySearch"/>
            <div class="vs-sidebar"
                 style="position:relative; min-width: 220px;z-index:9;max-width:100%;max-height: 465px;overflow-y: scroll">
              <ul class="vs-sidebar-group-items">
                <li v-for="(captain , key) in captains" :key="key">
                  <div class="vs-sidebar--item vs-sidebar-item-active">
                    <div class="p-3 pt-0" style="cursor: pointer;"
                         @click="setToggleCaptain(captain.id)"
                         :class="{'bg-primary-gradient text-white radius': isActive(captain.id)}"
                         target="_self">
                      <div class="relative w-3 h-6 m-0">
                        <div class="con-expand-users w-full">
                          <div class="con-btns-user relative flex items-center justify-between">
                            <div class="con-userx flex items-center justify-start">
                              <vs-avatar :badge="0" size="45px"
                                         :src="captain.image_path ? captain.image_path.path : require('@/assets/images/portrait/small/no_user.png')"/>
                              <span class="truncate text-bold p-2">{{captain.first_name}} {{captain.last_name}}</span>

                              <span class="truncate text-bold p-2" v-if="captain.status">
                                <vs-chip :color="captain.status.name == 'available' ? 'primary': 'danger'">{{captain.status.translated.title}}</vs-chip>
                              </span>
                              <span class="truncate text-bold p-2" v-if="captain.current_order">
                                <vs-chip color="#24c1a0">Order : #{{captain.current_order.id}}</vs-chip>
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                      <span class="truncate mb-2 p-2">&nbsp;</span>
                      <div class="badge" style="float:left">
                        <div class="truncate"
                             style="width: 10px;height: 10px;border-radius: 50%"
                             :class="isOnline('driver-'+captain.id) ? 'bg-success' : 'bg-danger'">
                        </div>
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
      <div class="vx-col w-full md:w-6/6 mb-2">
        <vx-card>
          <gmap-map ref="mapRef" v-bind:center="center" v-bind:zoom="12" style="width: 100%; height:500px"
                    :options="{styles:$helper.getMapDarkStyle()}">
            <gmap-marker ref="myMarker"
                         v-if="lastPoint"
                         :icon="markersIcons.success"
                         :position="lastPoint"/>
            <gmap-polyline v-bind:path.sync="locations" v-bind:options="{ strokeColor:'#f00'}">
            </gmap-polyline>
          </gmap-map>
        </vx-card>
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    data() {
      return {
        querySearch: '',
        active: false,
        rightVal: 0,
        captains: [],
        activeCaptains: [],
        onlineCaptains: [],
        locations: [],
        markersIcons: {
          success: require("@/assets/images/elements/success.png"),
          danger: require("@/assets/images/elements/danger.png"),
        },
        center: {
          lat: 30.782548,
          lng: 31.005233
        }
      }
    },
    computed: {
      lastPoint() {
        let locations = this.locations;
        if (!locations.length) return false;
        return locations[locations.length - 1];
      }
    },
    components: {},
    mounted() {
      this.getAllCaptains();
      this.mapSetCenter(this.center);
    },
    methods: {
      getAllCaptains() {
        let vm = this;
        vm.$vs.loading();
        let dispatch = this.$store.dispatch('moduleCaptain/fetchCaptains', {});
        dispatch.then((response) => {
          vm.captains = this.$store.getters['moduleCaptain/getAllCaptains'];
          this.setOnlineUsers();
          vm.$vs.loading.close();
        }).catch((error) => {
          vm.$helper.handleError(error, vm);
          vm.$vs.loading.close()
        });
      },
      setOnlineUsers() {
        const vm = this;
        let captainIds = _.map(vm.captains, (captain) => {
          return (`driver-${captain.id}`);
        });
        vm.$socket.emit('getOnlineUsers', captainIds, (callback) => {
          let dispatch = vm.$store.dispatch('moduleSocket/setOnlineUsers', callback);
          dispatch.then(() => {
            vm.getOnlineUsers();
            console.log('online users: ' + callback)
          })
        })
      },
      getOnlineUsers() {
        const vm = this;
        let users = vm.$store.getters['moduleSocket/getOnlineUsers'];
        vm.onlineCaptains = users;
      },
      isActive(id) {
        if (this.activeCaptains.includes(id)) return true;
        return false;
      },
      isOnline(key) {
        if (JSON.parse(JSON.stringify(this.onlineCaptains)).includes(key)) return true;
        return false;
      },
      setToggleCaptain(id) {
        let vm = this;
        vm.activeCaptains = [];
        if (vm.activeCaptains.includes(id)) {
          const index = vm.activeCaptains.indexOf(id);
          if (index > -1) {
            vm.activeCaptains.splice(index, 1);
          }
          vm.socketIoLeaveTrack(id)
        } else {
          vm.activeCaptains.push(id);
          vm.getDriverLocations(id);
          vm.socketIoJoinTrack(id);
        }
      },
      getDriverLocations(id) {
        const vm = this;
        vm.locations = [];
        vm.$socket.emit('getDriverLocations', id, (locations) => {
          if (locations.length) {
            vm.center = locations[0];
          }
          let center = vm.center;
          console.log(locations)
          vm.setMapPath(locations);
          vm.mapSetCenter(center);
        })
      },
      socketIoLeaveTrack(driver_id) {
        const vm = this;
        vm.locations = [];
        vm.$socket.emit('leave', `driver-${driver_id}`);
      },
      socketIoJoinTrack(driver_id) {
        const vm = this;
        vm.$socket.emit('join', `driver-${driver_id}`);
        vm.$socket.on('newDriverLocationListener', (location) => {
          vm.locations.push(location)
        });
      },
      setMapPath(locations) {
        this.locations = locations;
      },
      filterDrivers() {
        const vm = this;
        let querySearch = vm.querySearch;
        if (!querySearch) return false
        this.$store.dispatch('moduleCaptain/setQuerySearch', {querySearch: querySearch});
        vm.captains = this.$store.getters['moduleCaptain/getAllCaptainsSearchSorted'];
      },
      mapSetCenter(center) {
        const vm = this;
        vm.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(center)
        })
      },
    },
  }
</script>
<style>
  .transition {
    transition: all 0.5s ease-in-out !important;
  }
</style>
