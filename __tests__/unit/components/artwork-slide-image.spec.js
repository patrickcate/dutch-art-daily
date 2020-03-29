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
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('image load event fires', async () => {
    const imageHasLoadedMock = jest.fn()

    wrapper = createWrapper(ArtworkSlideImage, {
      ...options,
      methods: {
        imageHasLoaded() {
          imageHasLoadedMock()
        },
      },
    })

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(imageHasLoadedMock).toHaveBeenCalled()
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

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

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

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    // Active id and image prod id don't match.
    expect(wrapper.props('id')).toBe('12-12')
    expect(wrapper.vm.$store.state.activeId).toBe('01-01')

    wrapper.setProps({ id: '01-01' })

    wrapper.vm.$el = {
      parentNode: {
        scrollHeight: 0,
      },
    }

    wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$el.parentNode).toBeNull()
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
