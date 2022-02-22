import Vue from 'vue'

const state = () => ({
  getList: []
})

export const mutations = {
  getList (state, orders) {
    state.getList = orders.data
  }
}

export const actions = {
  getList: async function ({ commit }, meta) {
    return await Vue.api.get('/order/list/' + meta)
      .then(response => {
        commit('getList', response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
