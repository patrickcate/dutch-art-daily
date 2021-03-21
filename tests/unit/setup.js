import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseIconMock from '@fixtures/base-icon-mock.vue'
import mockData from '@fixtures/mock-data.js'
import {
  state as defaultState,
  getters as defaultGetters,
  mutations as defaultMutations,
  actions as defaultActions,
} from '~/store/index.js'

// From Vue Enterprise Boilerplate.
// @see https://github.com/chrisvfritz/vue-enterprise-boilerplate
// Make console.error throw, so that Jest tests fail
const error = console.error
console.error = function (message) {
  error.apply(console, arguments)
  // NOTE: You can whitelist some `console.error` messages here
  //       by returning if the `message` value is acceptable.
  throw message instanceof Error ? message : new Error(message)
}

// From Vue Enterprise Boilerplate.
// @see https://github.com/chrisvfritz/vue-enterprise-boilerplate
// Make console.warn throw, so that Jest tests fail
const warn = console.warn
console.warn = function (message) {
  warn.apply(console, arguments)
  // NOTE: You can whitelist some `console.warn` messages here
  //       by returning if the `message` value is acceptable.
  throw message instanceof Error ? message : new Error(message)
}

const createStore = ({
  state = {},
  getters = {},
  mutations = {},
  actions = {},
}) =>
  new Vuex.Store({
    state: {
      ...defaultState(),
      ...mockData.store.state,
      ...state,
    },
    getters: {
      ...defaultGetters,
      ...mockData.store.getters,
      ...getters,
    },
    mutations: {
      ...defaultMutations,
      ...mutations,
    },
    actions: {
      ...defaultActions,
      ...actions,
    },
  })

const pageComponents = ['HomePage', 'ArtworkPage', 'ErrorPage']

global.createWrapper = (
  component,
  options = {},
  storeState = {},
  mountType = 'shallow'
) => {
  const localVue = createLocalVue()

  localVue.use(Vuex)

  if (pageComponents.includes(component.name)) {
    localVue.use(VueMeta, { keyName: 'head' })
  }

  const store = createStore(storeState)

  const RootComponent = {
    name: 'RootComponent',
    template: '<div><slot></slot></div>',
    data() {
      return {
        swipers: {},
      }
    },
  }

  // Global stubs.
  options.stubs = {
    ...options.stubs,
    'base-icon': BaseIconMock,
    'base-carousel': true,
    nuxt: true,
  }

  let wrapper

  const wrapperOptions = {
    parentComponent: RootComponent,
    store,
    localVue,
    ...options,
  }

  if (mountType === 'mount') {
    wrapper = mount(component, wrapperOptions)
  } else if (mountType === 'shallow') {
    wrapper = shallowMount(component, wrapperOptions)
  }

  return wrapper
}
