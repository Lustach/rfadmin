<template>
  <q-page class="q-pa-sm bg-white">
    <q-resize-observer @resize="onResize"/>
    <!--    :style="{'height':size['height']-80+'px !important'}"-->
    <div class="row" v-if="!$q.screen.lt.sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card class="no-border no-border">
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height">
              <q-list class="">

                <div class="text-h6 text-center">Список пользователей</div>

                <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </q-item-label>

                <q-item-label header class="text-center">{{ contacts_list.length }} CONTACTS</q-item-label>

                <q-item clickable v-ripple v-for="(contact, id) in contacts_list" :key="id"
                        @click="selected_contact=contact">
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="../statics/profile.svg" alt="">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{ contact.login }}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{ contact.position }}</span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="1">{{ contact.name }}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{ contact.position }}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

          </q-tab-panels>

          <!--<q-tabs-->
            <!--v-model="tab"-->
            <!--dense-->
            <!--class="bg-grey-3"-->
            <!--align="justify">-->
            <!--<q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>-->
            <!--&lt;!&ndash;            <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab>&ndash;&gt;-->
          <!--</q-tabs>-->
        </q-card>
      </div>

      <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12">

        <q-card class="no-border no-border">
          <q-toolbar class="text-black">

            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img src="../statics/profile.svg" alt="">
              </q-avatar>
            </q-btn>

            <q-space/>
            <q-btn round flat icon="edit"/>

          </q-toolbar>

          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label lines="1">{{ selected_contact.name }}</q-item-label>
              <q-item-label caption class="text-grey-8">Имя</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label lines="1">{{ selected_contact.role_id }}</q-item-label>
              <q-item-label caption class="text-grey-8">Роль</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label lines="1">{{ selected_contact.status }}</q-item-label>
              <q-item-label caption class="text-grey-8">Статус</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset="item"></q-separator>

        </q-card>

      </div>
    </div>

    <div v-else>
      <div v-if="Object.keys(selected_contact).length === 0">
        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel name="all" class="q-pa-none full-height" :style="{'height':size['height']-100+'px !important'}">
            <q-list class="">

              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center">{{ contacts_list.length }} CONTACTS</q-item-label>

              <q-item clickable v-ripple v-for="(contact,id) in contacts_list" :key="id"
                      @click="selected_contact=contact">

                <q-item-section>
                  <q-item-label lines="1">{{ contact.name }}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{ contact.position }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
        >
          <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
        </q-tabs>
      </div>
      <transition v-else
                  appear
                  enter-active-class="animated bounceInRight">
        <q-card class="no-border no-border"
                :style="{'height':size['height']-100+'px !important'}">
          <q-toolbar class="text-black ">
            <q-btn round flat class="q-pa-sm">

            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{ selected_contact.information.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <!--                  <span class="text-weight-bold">{{ selected_contact.position }}</span>-->
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space/>

            <q-btn round flat icon="star_outline" color="yellow">
            </q-btn>
            <q-btn round flat icon="edit"/>
            <q-btn round flat icon="keyboard_backspace" @click="selected_contact={}"/>

          </q-toolbar>
          <q-separator inset="item"></q-separator>

          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>

            <q-item-section>
              <q-item-label lines="1">{{ selected_contact.name }}</q-item-label>
              <q-item-label caption class="text-grey-8">Email</q-item-label>
            </q-item-section>

          </q-item>
          <q-item clickable v-ripple>

            <q-item-section>
              <q-item-label lines="1">{{ selected_contact.information.gender }}</q-item-label>
              <q-item-label caption class="text-grey-8">Пол</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>

            <q-item-section>
              <q-item-label lines="1">{{ selected_contact.information.birthday }}</q-item-label>
              <q-item-label caption class="text-grey-8">Дата рождения</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>

            <q-item-section>
              <q-item-label lines="1">{{ selected_contact.address }}</q-item-label>
              <q-item-label caption class="text-grey-8">Address</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

        </q-card>
      </transition>
    </div>
  </q-page>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Customers',
  data () {
    return {
      tab: 'all',
      size: {},
      search: '',
      contacts_list: [],
      selected_contact: {},
      queryParams: '',
      pagination: {
        sortBy: 'asc',
        descending: false,
        page: 1,
        rowsNumber: 1,
        rowsPerPage: 20
      }
    }
  },
  computed: {
    ...mapState({
      getList: state => state.users.getList
    })
  },
  methods: {
    onResize (size) {
      this.size = size
    },
    load () {
      try {
        this.contacts_list = this.getList.data

        if (!this.$q.screen.lt.sm) {
          this.selected_contact = this.contacts_list[0]
        }
      } catch (e) {
      }
    }
  },
  created () {
    let params = '?page=' + this.pagination.page + '&count=' + this.pagination.rowsPerPage
    params = params + this.queryParams
    this.$store.dispatch('users/getList', params)
      .then(() => {})
  },
  watch: {
    getList () {
      this.load()
    }
  }
}
</script>

<style scoped>

</style>
