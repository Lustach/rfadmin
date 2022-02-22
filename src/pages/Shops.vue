<template lang="html">
  <q-page class="q-pa-sm">

    <q-card square>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          Магазины
        </div>
        <div class="text-subtitle2">
          Управление магазинами и их принадлежность к городам
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-none">

        <q-table
          v-if="shops.length"
          :data="filtered"
          :columns="columns"
          row-key="name"
          :pagination.sync="pagination"
          no-data-label="Ничего не найдено"
          rows-per-page-label="Записей на страницу:"
          :pagination-label="(a, b, c) => [a,'-',b, 'из', c].join(' ')"
          square
          v-show="!settingsForm"
        >
          <template v-slot:bottom="scope" class="row justify-between">
            <div class="col">
            </div>
            <div class="col-auto">
              {{ (scope.pagination.page - 1) * pagination.rowsPerPage + 1 }}
              - {{ (scope.pagination.page - 1) * pagination.rowsPerPage + pagination.rowsPerPage }}
              из {{ filtered.length }}
                  <q-btn
                    icon="chevron_left"
                    color="grey-8"
                    round dense flat
                    :disable="scope.isFirstPage"
                    @click="scope.prevPage"
                  />

                  <q-btn
                    icon="chevron_right"
                    color="grey-8"
                    round dense flat
                    :disable="scope.isLastPage"
                    @click="scope.nextPage"
                  />

            </div>
          </template>
          <template v-slot:body="props" ><q-tr @click="showSettingsForm(props)">
            <q-td>{{props.row.id}}</q-td>
            <q-td>{{props.row.uuid}}</q-td>
            <q-td>{{props.row.city}}</q-td>
            <q-td>{{props.row.name}}</q-td>
            <q-td>{{props.row.enabled}}</q-td>
          </q-tr></template>
          <template v-slot:header="props">
            <q-tr :props="props" >
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="no-padding"
              >
                <q-input
                  v-model="filter[col.name]"
                  :label="col.label"
                  :debounce="200"
                  square dense borderless class="q-px-sm"
                  input-class="text-green"
                />
              </q-th>
            </q-tr>
          </template>
        </q-table>

        <q-markup-table v-else>
      <thead>
        <tr>
          <th class="text-left" style="width: 150px">
            <q-skeleton  type="text" />
          </th>
          <th class="text-right">
            <q-skeleton  type="text" />
          </th>
          <th class="text-right">
            <q-skeleton type="text" />
          </th>
          <th class="text-right">
            <q-skeleton  type="text" />
          </th>
          <th class="text-right">
            <q-skeleton  type="text" />
          </th>
          <th class="text-right">
            <q-skeleton  type="text" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in 5" :key="n">
          <td class="text-left">
            <q-skeleton  type="text" width="85px" />
          </td>
          <td class="text-right">
            <q-skeleton  type="text" width="50px" />
          </td>
          <td class="text-right">
            <q-skeleton  type="text" width="35px" />
          </td>
          <td class="text-right">
            <q-skeleton  type="text" width="65px" />
          </td>
          <td class="text-right">
            <q-skeleton type="text" width="25px" />
          </td>
          <td class="text-right">
            <q-skeleton  type="text" width="85px" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
<!--        без template div прогрузится раньше данных и из-за v-show будут ошибки-->
        <template v-if="settingsForm">
        <div v-show="settingsForm" class="q-pa-md">
          <q-btn flat class="q-mb-sm" @click="settingsForm=!settingsForm" icon="arrow_back">Назад</q-btn>
          <q-input
            v-if="shops[shopIndex].id"
            disable
            filled
            :value="shops[shopIndex].id"
            @input="$event => $store.dispatch(CHANGE_SHOPS, { obj: shops[shopIndex].row, props: { id: $event } })"
            label="ID"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Введите что-нибудь']"
          />
          <q-input
            filled
            disable
            :value="shops[shopIndex].uuid"
            @input="$event => $store.dispatch(CHANGE_SHOPS, { obj: shops[shopIndex], props: { uuid: $event } })"
            label="UUID"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Введите что-нибудь']"
          />

          <q-select filled @input="$event => $store.dispatch(CHANGE_SHOPS, { obj: shops[shopIndex], props: { city: $event } })" :options="cities"
                    option-label="name" :value="shops[shopIndex].city" emit-value option-value="name"
                    label="Город" :lazy-rules="true" :rules="[ val => val && val.length > 0 || `${val}Введите что-нибудь`]" />
          <q-input
            filled
            :value="shops[shopIndex].name"
            @input="$event => $store.dispatch(CHANGE_SHOPS, { obj: shops[shopIndex], props: { name: $event } })"
            label="Название"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Введите что-нибудь']"
          />
          <q-input
            autogrow
            type="textarea"
            filled
            :value="shops[shopIndex].information"
            @input="$event => $store.dispatch(CHANGE_SHOPS, { obj: shops[shopIndex], props: { name: $event } })"
            label="Описание"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Введите что-нибудь']"
          />
          <q-img :src="shops[shopIndex].photo"></q-img>
          <q-toggle
            :value="shops[shopIndex].enabled"
            :label="shops[shopIndex].enabled ? 'Активный':'Неактивный'"
            :true-value="1"
            :false-value="0"
            @input="$event => $store.dispatch(CHANGE_SHOPS, { obj: shops[shopIndex], props: { enabled: $event } })"
            color="secondary"
          />
          <q-input
            type="time"
            filled
            :value="shops[shopIndex].workTime"
            @input="$event => $store.dispatch(CHANGE_SHOPS, { obj: shops[shopIndex], props: { name: $event } })"
            label="График работы"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Не должно быть пустым']"
          />
          <div>
            <q-btn
              :disable="!shops[shopIndex].__edited"
              :save="saving"
              @click="saveShop"
              label="Сохранить" type="submit" color="primary" style="margin-left: 10px"
            />
          </div>

        </div>
        </template>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOAD_SHOPS, SAVE_SHOPS, CHANGE_SHOPS } from 'src/store/Shops'
export default {
  name: 'Shops',
  computed: {
    ...mapGetters({
      shops: 'shops',
      cities: 'cities',
      cityById: 'cityById'
    }),
    filtered () {
      return this.shops.filter(row => {
        for (const k in this.filter) {
          if (!this.filter[k]) {
            continue
          }
          if (!this.compareFn[k](row, this.filter[k])) {
            return false
          }
        }
        return true
      })
    }
  },
  mounted () {
    if (!this.shops.length) {
      this.$store.dispatch(LOAD_SHOPS)
        .catch(e => console.log('e', e))
    }
  },
  data () {
    return {
      saving: false,
      CHANGE_SHOPS: CHANGE_SHOPS,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 20
      },
      columns: [
        {
          name: 'id',
          label: 'ID',
          align: 'left',
          style: 'width: 80px',
          field: row => row.id
        },
        {
          name: 'uuid',
          label: 'UUID',
          align: 'left',
          field: row => row.uuid
        },
        {
          name: 'city',
          label: 'Город',
          align: 'left',
          field: row => row.city_id ? this.cityById(row.city_id).name : '---'
        },
        {
          name: 'name',
          label: 'Название',
          align: 'left',
          field: row => row.name
        },
        {
          name: 'active',
          label: 'Активность',
          align: 'left'
        }
      ],
      filter: {
        id: null,
        city: null,
        name: null
      },
      compareFn: {
        id: (row, id) => (row.id | 0) === (id | 0),
        uuid: (row, uuid) => new RegExp('(' + uuid.replace(/\s/g, '') + ')', 'i').test(row.uuid),
        city: (row, name) => row.city_id &&
          this.cities.filter(city => new RegExp('(' + [name, this.translate(name)].join('|') + ')', 'i').test(city.name))
            .map(city => city.id)
            .includes(row.city_id),
        name: (row, name) => new RegExp('(' + [name, this.translate(name)].join('|') + ')', 'i').test(row.name)
      },
      settingsForm: false,
      shopIndex: 0
    }
  },
  watch: {
    '$q.screen.height': {
      immediate: true,
      handler () {
        this.pagination.rowsPerPage = Math.floor(((this.$q.screen.height | 0) - 270) / 48)
      }
    }
  },
  methods: {
    translate: function (str) {
      const search = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
      const replace = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '\\[', '\\]',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '\\.']

      for (var i = 0; i < replace.length; i++) {
        var reg = new RegExp(replace[i], 'mig')
        str = str.replace(reg, function (a) {
          return search[i]
        })
      }

      return str
    },
    showSettingsForm (rowData) {
      this.settingsForm = !this.settingsForm
      this.shopIndex = this.shops.indexOf(rowData.row)
    },
    saveShop () {
      this.saving = true
      this.$store.dispatch(SAVE_SHOPS, this.shops[this.shopIndex])
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
    }
  }
}
</script>

<style scoped>

</style>
