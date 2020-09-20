import mockData from '@fixtures/mock-data.js'
import ArtworkPage from '@pages/_date.vue'

describe('Artwork Page', () => {
  let wrapper
  let options
  let state

  beforeEach(() => {
    options = {
      mocks: {
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
    }

    state = {
      state: {
        currentArtworkHeight: 100,
        slides: [],
      },
      getters: {
        getArtworkById: () => () => {
          return null
        },
      },
    }

    wrapper = createWrapper(ArtworkPage, options, state)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('fetch will load store with slide data set initial active slide', async () => {
    const dispatchMock = jest.fn()

    const wrapper = createWrapper(
      ArtworkPage,
      {
        ...options,
        methods: {
          $icon() {
            return true
          },
        },
      },
      {
        getters: {
          getArtworkById: () => () => {
            return mockData.artwork
          },
        },
      }
    )

    await wrapper.vm.$options.fetch({
      store: {
        dispatch(args) {
          dispatchMock(args)
        },
      },
      params: {
        date: '01-01',
      },
    })

    expect(dispatchMock).toHaveBeenCalledWith('updateSlideData')
    expect(dispatchMock).toHaveBeenCalledWith('updateCurrentSlideIndex')
    expect(dispatchMock).toHaveBeenCalledWith('updateCurrentPage')
  })

  it('should validate route params', () => {
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
