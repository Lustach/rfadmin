<template>
    <span>
      <q-hierarchy :columns="columns" :data="data"></q-hierarchy>
    </span>
</template>

<script>
export default {
  name: 'SimpleHierarchy',
  data () {
    return {
      columns: [
        {
          name: 'label',
          required: true,
          label: 'Id',
          align: 'left',
          field: 'label',
          sortable: true,
          filterable: true
        },
        {
          name: 'label',
          required: true,
          label: 'Название',
          align: 'left',
          field: 'label',
          // (optional) tell QHierarchy you want this column sortable
          sortable: true,
          // If you want different sorting icon
          filterable: true
        },
        {
          name: 'Описание',
          label: 'Описание',
          sortable: true,
          field: 'Описание',
          align: 'center',
          filterable: false
        },
        {
          name: 'note',
          label: 'Дата',
          sortable: true,
          field: 'note',
          align: 'left',
          filterable: false
        }
      ],
      data: [
        {
          label: 'erewrwe',
          description: 'Node 1 description',
          note: 'Node 1 note',
          // id: 1,
          children: [
            {
              label: 'Node 1.1',
              description: 'Node 1.1 description',
              note: 'Node 1.1 note'
              // id: 2
            },
            {
              label: 'Node 1.2',
              description: 'Node 1.2 description',
              note: 'Node 1.2 note',
              // id: 3,
              children: [
                {
                  label: 'Node 1.2.1',
                  description: 'Node 1.2.1 description',
                  note: 'Node 1.2.1 note'
                  // id: 4
                },
                {
                  label: 'Node 1.2.2',
                  description: 'Node 1.2.2 description',
                  note: 'Node 1.2.2 note'
                  // id: 5
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () {
    // console.log(this.data)
    // console.log(this.columns)
  }
}
</script>

<style scoped>

</style>
