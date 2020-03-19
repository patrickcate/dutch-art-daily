import { shallowMount } from '@vue/test-utils'
import DefaultLayout from '@layouts/default.vue'

describe('DefaultLayout Layout', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(DefaultLayout, {
      stubs: {
        nuxt: '<div></div>',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
        },
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(DefaultLayout, {
      stubs: {
        nuxt: '<div></div>',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
        },
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('creates root swiper object if undefined', () => {
    const RootComponent = {
      data() {
        return {
          swipers: {
            carousel: true,
          },
        }
      },
    }

    const wrapper = shallowMount(DefaultLayout, {
      parentComponent: RootComponent,
      stubs: {
        nuxt: '<div></div>',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
        },
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
    })

    expect(wrapper.vm.$root.swipers).not.toBeUndefined()
    expect(wrapper.vm.$root).toHaveProperty('swipers')
  })

  it('sets active id to current route', () => {
    const mockStore = {
      state: {
        currentPage: null,
      },
      dispatch: jest.fn(),
    }

    shallowMount(DefaultLayout, {
      stubs: {
        nuxt: '<div></div>',
      },
      mocks: {
        $store: mockStore,
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
    })

    expect(mockStore.dispatch).toHaveBeenCalledWith('setCurrentPage', '01-01')
  })
})
