<template>
  <q-page class="q-pa-sm">
    <q-card>

      <q-table
        ref="table"
        dense
        class="text-left"
        title="Список покупателей"
        :data="tableData"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode === 'grid'"
        :filter="filter"
        :pagination.sync="pagination"
        :loading="loading"
        @request="onRequest"
        @row-click="onRowClick"
        binary-state-sort>

        <template v-slot:body-cell-id="props">
          <q-td class="col" :props="props">
            <q-item-section avatar>
              <q-avatar>
                <img src="../statics/profile.svg" alt="">
              </q-avatar>
            </q-item-section>
            <!--<span class="text-left">{{props.row.id}}</span>-->
          </q-td>
        </template>

        <template v-slot:body-cell-login="props">
          <q-td class="col" :props="props">
            {{ props.row.login | formatted }}
          </q-td>
        </template>

        <template v-slot:body-cell-name="props">
          <q-td class="col" :props="props">
            <span class="text-blue text-bold cursor-pointer">{{ props.row.name }}</span>
          </q-td>
        </template>

        <!--ФИО-->
        <template v-slot:body-cell-fio="props">
          <q-td class="col" :props="props">
            <span class="text-blue text-bold cursor-pointer">{{nameFor(props.row)}}</span>
          </q-td>
        </template>

        <template v-slot:top-right="props">
          <!--Поиск-->
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'">

            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen">

          </q-btn>

        </template>

      </q-table>

    </q-card>
    <q-dialog v-model="activePopup">
      <customer-popup :popupData="formData" :headerName="headerName"></customer-popup>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import CustomerPopup from 'components/Popup/CustomerPopup'

export default {
  name: 'products',
  components: {
    CustomerPopup
  },
  computed: {
    ...mapState({
      getList: state => state.customers.getList
    })
  },

  data () {
    return {
      activePopup: false,
      loading: true,
      filter: '',
      headerName: '',
      formData: {},
      tableData: [],
      queryParams: '',
      mode: 'list',
      columns: [
        {
          name: 'id',
          align: 'left',
          label: '',
          field: 'id',
          style: 'width: 60px',
          sortable: true
        },
        {
          name: 'login',
          align: 'left',
          label: 'login',
          field: 'login',
          sortable: true
        },
        {
          name: 'fio',
          align: 'left',
          label: 'имя/фамилия',
          field: 'fio',
          sortable: true
        },
        {
          name: 'status',
          align: 'left',
          label: 'Статус',
          field: 'status',
          sortable: true
        },
        {
          name: 'email',
          align: 'left',
          label: 'Email',
          field: 'email',
          sortable: true
        }
      ],
      pagination: {
        sortBy: 'asc',
        descending: false,
        page: 1,
        rowsNumber: 1,
        rowsPerPage: 20
      }
    }
  },
  mounted () {
    this.fetchFromServer()
  },
  methods: {
    fetchFromServer () {
      let params = '?page=' + this.pagination.page + '&count=' + this.pagination.rowsPerPage
      params = params + this.queryParams
      this.$store.dispatch('customers/getList', params)
        .then(() => {
          this.loading = false
        })
    },
    onRowClick (evt, row) {
      this.showForm(row)
    },
    load () {
      try {
        this.tableData = this.getList.data
        if (this.getList.meta.current_page === 1) {
          this.pagination.rowsPerPage = this.getList.meta.per_page
          this.pagination.rowsNumber = this.getList.meta.total
        }
      } catch (e) {
        console.log('e', e)
      }
    },
    showForm (data) {
      this.formData = data

      if (Object.keys(data).length > 0) {
        this.headerName = 'Редактировать пользователя'
      }
      this.activePopup = true
    },
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination

      this.loading = true

      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      this.fetchFromServer()

      // clear out existing data and add new
      this.tableData.splice(0, this.tableData.length, ...this.tableData)
    },
    nameFor (customer) {
      return [customer.first_name, customer.last_name].filter(v => !!v).join(' ') || 'н/у'
    }
  },
  watch: {
    getList () {
      this.load()
    }
  }
}
</script>

<style scoped>
::v-deep .description span {
  max-width: 400px;
}
</style>
