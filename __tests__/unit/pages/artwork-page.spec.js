import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import mockData from '@fixtures/mock-data.js'
import ArtworkPage from '@pages/_date.vue'

describe('Artwork Page', () => {
  it('should be a Vue instance', () => {
    const localVue = createLocalVue()
    localVue.use(VueMeta, { keyName: 'head' })

    const wrapper = shallowMount(ArtworkPage, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            slides: [],
            currentArtworkHeight: 100,
          },
          getters: {
            getArtworkById() {
              return null
            },
          },
        },
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
      localVue,
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const localVue = createLocalVue()
    localVue.use(VueMeta, { keyName: 'head' })

    const wrapper = shallowMount(ArtworkPage, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            slides: [],
            currentArtworkHeight: 100,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
        },
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
      methods: {
        $icon() {
          return true
        },
      },
      localVue,
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('fetch will load store with slide data set initial active slide', async () => {
    const dispatchMock = jest.fn()

    const wrapper = shallowMount(ArtworkPage, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            slides: [],
            currentArtworkHeight: 100,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
        },
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
      methods: {
        $icon() {
          return true
        },
      },
    })

    await wrapper.vm.$options.fetch({
      store: {
        dispatch(...args) {
          dispatchMock(args)
        },
      },
      params: {
        date: '01-01',
      },
    })

    expect(dispatchMock.mock.calls[0][0][0]).toBe('updateSlideData')
    expect(dispatchMock.mock.calls[1][0][0]).toBe('updateCurrentSlideIndex')
    expect(dispatchMock.mock.calls[2][0][0]).toBe('updateCurrentPage')
  })

  it('should validate route params', () => {
    const wrapper = shallowMount(ArtworkPage, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            slides: [],
            currentArtworkHeight: 100,
          },
          getters: {
            getArtworkById() {
              return null
            },
          },
        },
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
    })

    const isValid = wrapper.vm.$options.validate({
      params: {
        date: '01-01',
      },
    })
    expect(isValid).toBe(true)

    const isNotValid = wrapper.vm.$options.validate({
      params: {
        date: '99-99',
      },
    })

    expect(isNotValid).toBe(false)
  })
})
