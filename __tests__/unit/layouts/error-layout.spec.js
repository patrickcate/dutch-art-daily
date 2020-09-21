import ErrorLayout from '@layouts/error-layout.vue'

describe('ErrorLayout', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      mocks: {
        $route: {
          params: {
            date: '13-13',
          },
        },
      },
    }

    wrapper = createWrapper(ErrorLayout, options)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
