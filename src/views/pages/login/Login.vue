<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-8 pt-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">{{$t('login')}}</h4>
                  <p>{{$t('login_welcome')}}</p>
                </div>

                <vs-tabs>
                  <vs-tab label="JWT">
                    <div>
                      <vs-input
                        v-validate="'required|min:3'"
                        data-vv-validate-on="blur"
                        name="username"
                        icon-no-border
                        icon="icon icon-user"
                        icon-pack="feather"
                        :label-placeholder="$t('username')"
                        v-model="username"
                        class="w-full"/>
                      <span class="text-danger text-sm">{{ errors.first('username') }}</span>

                      <vs-input
                        data-vv-validate-on="blur"
                        v-validate="'required|min:6|max:10'"
                        type="password"
                        name="password"
                        icon-no-border
                        icon="icon icon-lock"
                        icon-pack="feather"
                        :label-placeholder="$t('password')"
                        v-model="password"
                        class="w-full mt-6"/>
                      <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                      <div class="flex flex-wrap justify-between mt-3 mb-3">
                        <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
                      </div>
                    </div>
                  </vs-tab>
                </vs-tabs>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>


<script>

  export default {
    data() {
      return {
        username: '',
        password: '',
        checkbox_remember_me: false
      }
    },
    computed: {
      validateForm() {
        return !this.errors.any() && this.username != '' && this.password != '';
      },
    },
    methods: {
      checkLogin() {
        // If user is already logged in notify
        if (this.$store.state.moduleAuth.isUserLoggedIn()) {

          // Close animation if passed as payload
          this.$vs.loading.close()

          this.$vs.notify({
            title: 'Login Attempt',
            text: 'You are already logged in!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning'
          })

          return false
        }
        return true
      },
      loginJWT() {
        let vm = this;
        if (!vm.checkLogin()) return
        // Loading
        vm.$vs.loading()

        const payload = {
            vm: vm,
            userDetails: {
              username: vm.username,
              password: vm.password,
            }
          }
        ;

        vm.$store.dispatch('moduleAuth/loginJWT', payload)
          .then(() => {
            vm.$vs.loading.close()
          })
          .catch(error => {
            vm.$helper.handleError(error, vm);
            vm.$vs.loading.close()
          })
      },
    }
  }

</script>

