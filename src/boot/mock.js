import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

if (process.env.IS_MOCK) {
  const normalAxios = axios.create()
  const mock = new MockAdapter(axios)

  mock.onGet('/category/list/')
    .reply(config => {
      console.info('[Mock] ', config.url)

      const data = require('../fixtures/categories.json')

      return [200, data]
    })

  mock.onGet('/store/list/')
    .reply(config => {
      console.info('[Mock] ', config.url)

      const data = require('../fixtures/store.json')

      return [200, data]
    })

  mock.onGet('/city/list/')
    .reply(config => {
      console.info('[Mock] ', config.url)

      const data = require('../fixtures/cities.json')

      return [200, data]
    })

  mock.onPost()
    .reply(config => normalAxios.post(config.url, JSON.parse(config.data)))
  mock.onGet()
    .reply(config => normalAxios.get(config.url))
}
