<template>
  <q-card style="width: 600px; max-width: 60vw;">
    <q-card-section>
      <div class="text-h6">
        {{ headerName }}
        <q-btn round flat dense icon="close"
               class="float-right"
               color="grey-8"
               v-close-popup>
        </q-btn>
      </div>
    </q-card-section>
    <q-separator inset></q-separator>
    <q-card-section class="q-pt-none">
      <q-form class="q-gutter-md">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Активность</q-item-label>
              <div class="q-gutter-sm">
                <q-checkbox v-model="saveData.enabled"/>
              </div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Название</q-item-label>
              <q-input dense outlined v-model="saveData.name" label="Название"/>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Сортировка</q-item-label>
              <q-input dense outlined v-model="saveData.order"/>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs">Описание</q-item-label>
              <textarea placeholder="Описание" v-model="saveData.description"></textarea>
            </q-item-section>
          </q-item>

        </q-list>
      </q-form>
      <q-card-actions align="center" class="text-teal">
        <q-btn @click="save()" label="Сохранить" color="primary"/>
      </q-card-actions>
    </q-card-section>

  </q-card>
</template>

<script>
export default {
  name: 'CategoryPopup',
  props: {
    categoryData: {},
    headerName: {}
  },
  data () {
    return {
      saveData: {}
    }
  },
  methods: {
    save () {
      if (this.saveData.name) {
        this.$store.dispatch('categories/saveCategory', this.saveData)
          .then(
            this.$q.notify({
              message: 'Изменения сохранены',
              color: 'black',
              timeout: 500
            })
          )
      }
    }
  },
  watch: {
    activePopup () {
      this.saveData = this.categoryData
      if (this.saveData.enabled === 1) {
        this.saveData.enabled = true
      } else this.saveData.enabled = false
    }
  }
}
</script>
