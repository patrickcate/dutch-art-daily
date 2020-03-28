import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import {
  state as defaultState,
  getters as defaultGetters,
  mutations as defaultMutations,
  actions as defaultActions,
} from '~/store/index.js'

const createStore = ({
  state = {},
  getters = {},
  mutations = {},
  actions = {},
}) =>
  new Vuex.Store({
    state: {
      ...defaultState,
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

global.createWrapper = (
  component,
  options = {},
  storeState = {},
  mountType = 'shallow'
) => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)

  const store = createStore(storeState)
  const router = new VueRouter()

  const RootComponent = {
    name: 'RootComponent',
    template: '<div><slot></slot></div>',
  }

  let wrapper

  if (mountType !== 'shallow') {
    wrapper = mount(component, {
      parentComponent: RootComponent,
      store,
      router,
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
      router,
      localVue,
      stubs: {
        ...mockData.stubs,
      },
      ...options,
    })
  }

  wrapper.vm.$root = {
    swipers: {},
  }

  return wrapper
}
