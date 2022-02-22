<template>
  <q-card style="width: 600px; max-width: 60vw;">
    <q-card-section>
      <div class="text-h6">
        {{ headerName }}
        <q-btn round flat dense
               icon="close"
               class="float-right"
               color="grey-8"
               v-close-popup/>
      </div>
    </q-card-section>
    <q-separator :inset="true" />
    <q-card-section class="q-pt-none">
      <q-form class="q-gutter-md">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Имя</q-item-label>
              <q-input dense outlined v-model="saveData.name" label="Имя"/>
            </q-item-section>

            <q-item-section>
              <q-item-label class="q-pb-xs">Фамилия</q-item-label>
              <q-input dense outlined v-model="saveData.surname" label="Фамилия"/>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Login</q-item-label>
              <q-input dense outlined v-model="saveData.login" label="Логин"/>
            </q-item-section>

            <q-item-section>
              <q-item-label class="q-pb-xs">Email</q-item-label>
              <q-input dense outlined v-model="saveData.email" label="Email"/>
            </q-item-section>

          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Статус</q-item-label>
              <q-select dense outlined style="min-width: 200px" v-model="saveData.status" :options="statuses"
                        class="float-right" label="Статус покупателя"/>
            </q-item-section>
          </q-item>

        </q-list>
      </q-form>
      <q-card-actions align="center" class="text-teal">
        <q-btn @click="save" label="Сохранить" type="submit" color="primary"/>
      </q-card-actions>
    </q-card-section>

  </q-card>

</template>

<script>
export default {
  name: 'EditPopup',
  props: {
    popupData: {},
    headerName: {}
  },
  data () {
    return {
      statuses: [
        'Новый',
        'Обычный',
        'Заблокированный'
      ],
      activePopup: true,
      saveData: {}
    }
  },
  mounted () {
    this.saveData = this.popupData
    this.load()
  },
  methods: {
    load () {
      if (this.saveData.information.first_name) {
        this.saveData.name = this.saveData.information.first_name
      }
      if (this.saveData.information.last_name) {
        this.saveData.surname = this.saveData.information.last_name
      }
    },
    save () {
      if (this.saveData.login) {
        this.saveData.status_id = this.statuses.indexOf(this.saveData.status)
        this.$store.dispatch('customers/save', this.saveData).then(
          this.showNotif()
        )
      }
    },
    showNotif () {
      this.$q.notify({
        message: 'Изменения сохранены',
        color: 'black',
        timeout: 500
      })
    }
  },
  watch: {
  }
}
</script>
