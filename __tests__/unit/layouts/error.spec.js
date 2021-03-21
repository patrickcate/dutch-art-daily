import Error from '@layouts/error.vue'

describe('Error', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        error: {
          statusCode: '404',
        },
      },
    }

    wrapper = createWrapper(Error, options)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders generic message', async () => {
    wrapper.setProps({
      error: null,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  it('does not render image if src path is not available', async () => {
    wrapper.setData({ artwork: null })
    await wrapper.vm.$nextTick()

    expect(wrapper).toMatchSnapshot()
  })
})
