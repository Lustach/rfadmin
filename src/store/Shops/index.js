import Vue from 'vue'

export const LOAD_SHOPS = 'load_shops'
export const SAVE_SHOPS = 'save_shops'
export const CHANGE_SHOPS = 'change_shops'

const state = {
  shops: [],
  cities: []
}

const getters = {
  shops: state => state.shops,
  cities: state => state.cities,
  cityById: state => (id) => state.cities.find(city => city.id === id)
}

const actions = {
  [LOAD_SHOPS]: async ({ commit }) => {
    const requestOne = Vue.api.get('/store/list')
      .then(data => {
        commit(LOAD_SHOPS, { key: 'shops', data: data.data })
        return data.data
      })
    const requestTwo = Vue.api.get('/city/list')
      .then(data => {
        commit(LOAD_SHOPS, { key: 'cities', data: data.data })
        return data.data
      })

    return await Vue.api.all([requestOne, requestTwo])
  },
  [CHANGE_SHOPS]: ({ commit }, data) => {
    commit(CHANGE_SHOPS, data)
  },
  [SAVE_SHOPS]: async ({ commit }, shop) => {
    return await Vue.api.post('/store/update/' + shop.id, shop)
      .then(() => commit(SAVE_SHOPS, shop))
  }
}
const mutations = {
  [LOAD_SHOPS]: (state, { key, data }) => {
    state[key] = data
  },
  [SAVE_SHOPS]: (state, shop) => {
    shop.__edited = false
  },
  [CHANGE_SHOPS]: (state, { obj, props }) => {
    Object.assign(obj, props, { __edited: true })
  }
}

export const ShopsStore = {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
