import BackgroundStack from '@components/background-stack.vue'

describe('BackgroundStack Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(
      BackgroundStack,
      {},
      {
        state: {
          loadedSlides: {
            '01-01': '01-01',
          },
        },
      }
    )
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('does not render correctly', () => {
    wrapper = createWrapper(
      BackgroundStack,
      {},
      {
        state: {
          loadedSlides: {},
        },
      }
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('has no active background', () => {
    wrapper = createWrapper(
      BackgroundStack,
      {},
      {
        state: {
          loadedSlides: {
            '01-01': '01-01',
          },
        },
        getters: {
          getArtworkById: () => () => {
            return null
          },
        },
      }
    )

    expect(wrapper).toMatchSnapshot()
  })
})
