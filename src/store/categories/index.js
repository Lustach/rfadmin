import Vue from 'vue'

export const CATEGORY_LOAD = 'category/load'
export const CATEGORY_SAVE = 'category/save'
export const OBJECT_CHANGE = 'object/change'

export default {
  namespaced: false,
  state: {
    categories: []
  },
  getters: {
    categories: state => state.categories
  },
  actions: {
    [CATEGORY_LOAD]: async ({ commit }) => {
      return await Vue.api.get('/category/list/')
        .then(data => commit(CATEGORY_LOAD, data.data))
    },
    [OBJECT_CHANGE]: ({ commit }, data) => {
      commit(OBJECT_CHANGE, data)
    },
    [CATEGORY_SAVE]: async ({ commit }, category) => {
      return await Vue.api.post('/category/update/' + category.id, category)
        .then(() => commit(CATEGORY_SAVE, category))
    }
  },

  mutations: {
    [CATEGORY_LOAD]: (state, categories) => {
      state.categories = categories
    },
    [CATEGORY_SAVE]: (state, category) => {
      category.__edited = false
    },

    [OBJECT_CHANGE]: (state, { obj, props }) => {
      Object.assign(obj, props, { __edited: true })
    }
  }
}
