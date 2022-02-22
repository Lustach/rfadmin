<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/rf.jpg" alt="" />
            </q-avatar>
          </q-card-section>
          <q-card-section>

          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.login"
                label="Логин"
                :lazy-rules="true"
              />

              <q-input
                type="password"
                filled
                v-model="user.password"
                label="Пароль"
                :lazy-rules="true"

              />
              <div class="row justify-end">
                <q-btn
                  @click="onSubmit"
                  :loading="loading"
                  label="Войти"
                  type="button"
                  color="primary"
                  class="q-px-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ROUTE_HOME } from 'src/router/routes'

export default {
  data () {
    return {
      user: {
        login: '123',
        password: '123'
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true

      this.$api.post('/auth/login', this.user)
        .then(data => {
          this.$api.defaults.headers.common.Authorization = 'Bearer ' + data.access_token
          localStorage.setItem('token', data.access_token)
          this.$router.push({ name: ROUTE_HOME }).catch(() => {
          })
        })
        .catch(reason => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: reason.response?.data?.message || reason.toString()
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
