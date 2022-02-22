<template>
  <q-page class="q-pa-sm">
    <q-card>

      <q-table
        ref="table"
        dense
        class="text-left"
        title="Список заказов"
        :data="tableData"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode === 'grid'"
        :filter="filter"
        :pagination.sync="pagination"
        :loading="loading"
        @request="onRequest"
        binary-state-sort>

        <template v-slot:body-cell-id="props">
          <q-td class="col" :props="props">
            <span class="text-left">{{props.row.id}}</span>
          </q-td>
        </template>

        <!--Название-->
        <template v-slot:body-cell-name="props">
          <q-td class="col" @click="showForm(props['row'])"
                :props="props">
            <span class="text-blue text-bold cursor-pointer">{{props.row.name}}</span>
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

  </q-page>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
  name: 'products',
  computed: {
    ...mapState({
      getList: state => state.orders.getList
    })
  },

  data () {
    return {
      loading: true,
      filter: '',
      active: false,
      formData: {},
      tableData: [],
      queryParams: '',
      mode: 'list',
      columns: [
        {
          name: 'id',
          align: 'left',
          label: 'ID',
          field: 'id',
          style: 'width: 60px',
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
          name: 'delivery_type',
          align: 'left',
          label: 'Типы доставки',
          field: 'delivery_type',
          sortable: true
        },
        {
          name: 'payment_type',
          align: 'left',
          label: 'Типы оплаты',
          field: 'payment_type',
          sortable: true
        }
        // {
        //   name: "prodCount",
        //   align: "left",
        //   label: "Количество товаров",
        //   field: "prodCount",
        //   sortable: true
        // }
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
      this.$store.dispatch('orders/getList', params)
        .then(() => {
          this.loading = false
        })
    },
    load () {
      try {
        this.tableData = this.getList.data
        if (this.getList.meta.current_page === 1) {
          this.pagination.rowsPerPage = this.getList.meta.per_page
          this.pagination.rowsNumber = this.getList.meta.total
        }
      } catch (e) {}
    },
    showForm (data) {
      this.formData = data

      if (Object.keys(data).length > 0) {
        this.headerName = 'Редактировать'
      }
      this.active = true

      Vue.prototype.$bus.$emit('showForm', true)
    },
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      // const filter = props.filter

      this.loading = true
      // this.pagination.rowsNumber = this.getRowsNumberCount(filter);
      // get all rows if "All" (0) is selected
      // const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

      // don't forget to update local pagination object
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      this.fetchFromServer()

      // clear out existing data and add new
      this.tableData.splice(0, this.tableData.length, ...this.tableData)
    }
  },
  watch: {
    productsParams () {
      this.fetchFromServer()
    },
    getList () {
      this.load()
    }
  }
}
</script>

<style scoped lang="scss">
  ::v-deep .description span {
    max-width: 400px;
  }
</style>
