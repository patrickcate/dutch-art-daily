import Homepage from '@pages/index.vue'

describe('Homepage', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      mocks: {
        $homepageRedirect() {},
      },
    }

    wrapper = createWrapper(Homepage, options)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('render an empty string', () => {
    process.server = true

    wrapper = createWrapper(Homepage, {
      ...options,
      methods: {
        $icon() {
          return true
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })
})
