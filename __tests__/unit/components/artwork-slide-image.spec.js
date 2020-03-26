import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import ArtworkSlideImage from '@components/artwork-slide-image.vue'

describe('ArtworkSlideImage Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ArtworkSlideImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentArtworkHeight: 100,
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
    const wrapper = shallowMount(ArtworkSlideImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentArtworkHeight: 100,
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

    const wrapper = shallowMount(ArtworkSlideImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentArtworkHeight: 100,
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
    let currentArtworkHeightMock = 500

    const wrapper = shallowMount(ArtworkSlideImage, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentArtworkHeight: 100,
            imageWidths: mockData.imageWidths,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },

          dispatch(action, payload) {
            if (action === 'updateLoadedSlides') {
              loadedSlidesMock.push(payload)
            }

            if (action === 'updateCurrentArtworkHeight') {
              currentArtworkHeightMock = payload
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
    expect(currentArtworkHeightMock).toBe(500)

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(loadedSlidesMock[0]).toBe('01-01')
    expect(currentArtworkHeightMock).toBe(1000)
  })

  it('only update height from active slide image', async () => {
    const loadedSlidesMock = []
    let currentArtworkHeightMock = 0

    const wrapper = shallowMount(ArtworkSlideImage, {
      propsData: {
        id: '12-12',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentArtworkHeight: 100,
            imageWidths: mockData.imageWidths,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
          dispatch(action, payload) {
            if (action === 'updateLoadedSlides') {
              loadedSlidesMock.push(payload)
            }

            if (action === 'updateCurrentArtworkHeight') {
              currentArtworkHeightMock = payload
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

    expect(wrapper.props('id')).toBe(wrapper.vm.$store.state.activeId)

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 1000,
      },
    }
    wrapper.vm.$store.state.currentArtworkHeight = 1000

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(currentArtworkHeightMock).toBe(0)
  })
})
