import Vue from 'vue'

// if (meta){
//   count = meta.count;
//   pageId = meta.id;
// }
// let params = '?page=' + pageId + '&count=' + count;
// if (meta.search){
//   params = parfams + '&searchQuery=' + meta.search
// }
// if (meta.slug){
//   params = params + '&categorySlug=' + meta.slug;
// }
// if (meta.filter){
//   params = params + '&filterData=' + meta.filter;
// }
// if (meta.sort){
//   params = params + '&sort=' + meta.sort.type + '&order=' + meta.sort.order;
// }

export async function getProdcuts ({ commit }, meta) {
  const params = '?page=' + meta.page + '&count=' + meta.rowsPerPage
  return await Vue.api.get('/product/list/' + params)
    .then(response => {
      commit('productList', response.data)
    })
    .catch(error => {
      console.log(error)
    })
}
