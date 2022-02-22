import Vue from 'vue'

const state = () => ({
  getList: []
})

export const mutations = {
  getList (state, users) {
    state.getList = users.data
  }
}

export const actions = {
  save: async function ({ commit }, data) {
    const id = data.id
    return await Vue.api.post('/user/update/' + id, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getList: async function ({ commit }, meta) {
    return await Vue.api.get('/user/list/' + meta)
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
