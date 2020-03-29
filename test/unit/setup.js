import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import {
  state as defaultState,
  getters as defaultGetters,
  mutations as defaultMutations,
  actions as defaultActions,
} from '~/store/index.js'

// Make console.error throw, so that Jest tests fail
const error = console.error
console.error = function(message) {
  error.apply(console, arguments)
  // NOTE: You can whitelist some `console.error` messages here
  //       by returning if the `message` value is acceptable.
  throw message instanceof Error ? message : new Error(message)
}

// Make console.warn throw, so that Jest tests fail
const warn = console.warn
console.warn = function(message) {
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

const pageComponents = ['HomePage', 'ArtworkPage']

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

  let wrapper

  if (mountType !== 'shallow') {
    wrapper = mount(component, {
      parentComponent: RootComponent,
      store,
      localVue,
      stubs: {
        ...mockData.stubs,
      },
      ...options,
    })
  } else {
    wrapper = shallowMount(component, {
      parentComponent: RootComponent,
      store,
      localVue,
      stubs: {
        ...mockData.stubs,
      },
      ...options,
    })
  }

  return wrapper
}
