import mockData from '@fixtures/mock-data.js'
import ArtworkSlideImage from '@components/artwork-slide-image.vue'

describe('ArtworkSlideImage Component', () => {
  let wrapper
  let options
  let state

  beforeEach(() => {
    options = {
      propsData: {
        id: '01-01',
      },
    }

    state = {
      state: {
        currentArtworkHeight: 100,
      },
    }

    wrapper = createWrapper(ArtworkSlideImage, options, state)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('slide is tracked and height set after image loads', async () => {
    wrapper = createWrapper(
      ArtworkSlideImage,
      {
        ...options,
      },
      {
        state: {
          currentArtworkHeight: 400,
        },
      }
    )

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 1000,
      },
    }

    expect(Object.keys(wrapper.vm.$store.state.loadedSlides).length).toBe(0)
    expect(wrapper.vm.$store.state.currentArtworkHeight).toBe(400)

    await wrapper.find('img').trigger('load')

    expect(Object.keys(wrapper.vm.$store.state.loadedSlides)[0]).toBe('01-01')
    expect(wrapper.vm.$store.state.currentArtworkHeight).toBe(1000)
  })

  it('only update height from active slide image', async () => {
    wrapper = createWrapper(
      ArtworkSlideImage,
      {
        ...options,
        propsData: {
          id: '12-12',
        },
      },
      {
        state: {
          currentArtworkHeight: 0,
        },
        getters: {
          getArtworkById: () => () => {
            return mockData.artwork
          },
        },
      }
    )

    await wrapper.find('img').trigger('load')

    // Active id and image prod id don't match.
    expect(wrapper.props('id')).toBe('12-12')
    expect(wrapper.vm.$store.state.activeId).toBe('01-01')

    wrapper.setProps({ id: '01-01' })
    await wrapper.vm.$nextTick()

    expect(wrapper.props('id')).toBe('01-01')

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 0,
      },
    }

    await wrapper.find('img').trigger('load')

    expect(wrapper.vm.$el.parentNode.scrollHeight).toBe(0)
  })

  it('only generates available image sizes', () => {
    wrapper = createWrapper(ArtworkSlideImage, options, {
      ...state,
      getters: {
        getArtworkById: () => () => {
          return {
            ...mockData.artwork,
            ...{
              xl3: null,
            },
          }
        },
      },
    })

    const dataSrcSet = wrapper.find('img').attributes('data-srcset')
    expect(dataSrcSet).not.toContain('xl3')
  })
})
