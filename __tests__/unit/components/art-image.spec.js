import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import ArtImage from '@components/art-image.vue'

describe('ArtImage Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ArtImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            currentHeight: 100,
            imageWidths: mockData.imageWidths,
          },
          getters: {
            getArtworkById() {
              return {
                ...mockData.artwork,
                ...{
                  xl3: null,
                },
              }
            },
          },
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(ArtImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            currentHeight: 100,
            imageWidths: mockData.imageWidths,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('image load event fires', async () => {
    const imageHasLoadedMock = jest.fn()

    const wrapper = shallowMount(ArtImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            currentHeight: 100,
            imageWidths: mockData.imageWidths,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
        },
      },
      methods: {
        imageHasLoaded() {
          imageHasLoadedMock()
        },
      },
    })

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 1000,
      },
    }

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(imageHasLoadedMock).toHaveBeenCalled()
  })

  it('slide is tracked and height set after image loads', async () => {
    const loadedSlidesMock = []
    let currentHeightMock = 500

    const wrapper = shallowMount(ArtImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            currentHeight: 100,
            imageWidths: mockData.imageWidths,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
          commit(mutation, payload) {
            if (mutation === 'SET_LOADED_SLIDES') {
              loadedSlidesMock.push(payload)
            } else if (mutation === 'SET_CURRENT_HEIGHT') {
              currentHeightMock = payload
            }
          },
        },
      },
    })

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 1000,
      },
    }

    expect(loadedSlidesMock.length).toBe(0)
    expect(currentHeightMock).toBe(500)

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(loadedSlidesMock[0]).toBe('01-01')
    expect(currentHeightMock).toBe(1000)
  })

  it('only update height from active slide image', async () => {
    const loadedSlidesMock = []
    let currentHeightMock = 0

    const wrapper = shallowMount(ArtImage, {
      propsData: {
        id: '12-12',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            currentHeight: 100,
            imageWidths: mockData.imageWidths,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
          commit(mutation, payload) {
            if (mutation === 'SET_LOADED_SLIDES') {
              loadedSlidesMock.push(payload)
            } else if (mutation === 'SET_CURRENT_HEIGHT') {
              currentHeightMock = payload
            }
          },
        },
      },
    })

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 1000,
      },
    }

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(wrapper.props('id')).toBe('12-12')

    wrapper.setProps({ id: '01-01' })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('id')).toBe(wrapper.vm.$store.state.currentPage)

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 1000,
      },
    }
    wrapper.vm.$store.state.currentHeight = 1000

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(currentHeightMock).toBe(0)
  })
})
