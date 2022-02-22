<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">Категории товаров {{selected}}</div>
        <div class="text-subtitle2">Управление категориями</div>
      </q-card-section>

      <q-separator />

          <q-splitter
            v-model="splitterModel"
            style="height: 80vh "
          >

          <template v-slot:before>
            <div class="q-pa-md">
              <q-item-section v-if="loading">
                <div v-for="item in 10" :key="item">
                  <q-skeleton bordered />
                  <br />
                </div>
              </q-item-section>
              <div v-else>
                <q-input
                  ref="filter"
                  filled
                  v-model="filter"
                  label="Поиск категорий по названию"
                >
                  <template v-slot:append>
                    <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
                  </template>
                </q-input>

                <q-tree
                  :nodes="treeData"
                  :selected.sync="selected"
                  :expanded.sync="expanded"
                  :filter="filter"
                  :filter-method="myFilterMethod"
                  node-key="id"
                  label-key="name"
                  selected-color="red-10"
                  class="text-body1"
                >
                  <template v-slot:default-header="prop">
                    <div :class="{ 'text-bold': prop.node.id === selected }" class="full-width ">
                       {{ prop.node.name }}
                    </div>
                  </template>
                </q-tree>
              </div>
            </div>
          </template>

      <template v-slot:after>
        <q-tab-panel v-if="loading" name="skeleton">
          <q-skeleton width="200px" type="rect" />
          <br />
          <q-skeleton width="150px" type="text" />
          <br />
          <q-skeleton width="300px" type="text" />
          <br />
          <q-skeleton type="QInput" />
          <br />
          <q-skeleton type="QInput" />
          <br />
          <q-skeleton type="QBtn" />
        </q-tab-panel>
        <div v-if="category">
          <q-tab-panel name="Relax Hotel">
            <div class="text-h4 q-mb-md">{{ category.name }}</div>
            <p>uuid: {{ category.uuid }}</p>
            <p>Описание: {{ category.description }}</p>
          </q-tab-panel>
            <q-input
              filled
              :value="category.name"
              @input="$event => $store.dispatch(OBJECT_CHANGE, { obj: category, props: { name: $event } })"
              label="Название категории"
              :lazy-rules="true"
              :rules="[ val => val && val.length > 0 || 'Введите что-нибудь']"
            />
          <q-input
            :value="category.description"
            @input="$event => $store.dispatch(OBJECT_CHANGE, { obj: category, props: { description: $event } })"
            label="Описание категории"
            type="textarea"
            filled
            autogrow
          />

            <q-toggle
              :value="category.enabled"
              :label="category.enabled ? 'Активный':'Неактивный'"
              :true-value="1"
              :false-value="0"
              @input="$event => $store.dispatch(OBJECT_CHANGE, { obj: category, props: { enabled: $event } })"
              color="secondary"
            />

            <div>
              <q-btn
                :disable="!category.__edited"
                :save="saving"
                @click="saveCategory"
                label="Сохранить" type="submit" color="primary" style="margin-left: 10px"
              />
            </div>

        </div>
      </template>
    </q-splitter>

    </q-card>
  </q-page>

</template>

<script>
import { mapGetters } from 'vuex'
import { CATEGORY_LOAD, CATEGORY_SAVE, OBJECT_CHANGE } from 'src/store/categories'

export default {
  name: 'Categories',
  computed: {
    ...mapGetters({
      categories: 'categories'
    }),
    category () {
      return this.categories.find(category => category.id === this.selected)
    },
    treeData () {
      const data = []
      this.categories.filter(category => !category.parent_id).forEach(category => {
        category.selectable = this.selected !== category.id
        category.children = this.categories.filter(sub => sub.parent_id === category.id).map(sub => {
          sub.selectable = this.selected !== sub.id
          sub.children = this.categories.filter(subsub => subsub.parent_id === sub.id).map(category => {
            category.selectable = this.selected !== category.id
            return category
          })
          return sub
        })
        data.push(category)
      })

      return data
    }
  },
  data () {
    return {
      OBJECT_CHANGE: OBJECT_CHANGE,
      saving: false,
      splitterModel: 50,
      expanded: [],
      selected: null,
      filter: null,
      loading: true,
      categoryData: {}
    }
  },
  created () {
    this.loading = true
    this.$store.dispatch(CATEGORY_LOAD).then(() => {
      this.loading = false
      this.expanded = this.treeData.map(category => category.id)
      this.selected = this.expanded.slice().shift()
    })
  },
  watch: {
    selected (value) {
      if (value) {
        this.selected = value
      }
    }
  },
  methods: {
    saveCategory: function () {
      this.saving = true
      this.$store.dispatch(CATEGORY_SAVE, this.category)
        .then(() => {
          this.$q.notify({
            message: 'Изменения сохранены',
            color: 'black',
            timeout: 500
          })
        })
        .finally(() => {
          this.saving = false
        })
    },
    myFilterMethod (node, filter) {
      return node.name && node.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    },

    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    }
  }
}
</script>
<style scoped>
</style>
