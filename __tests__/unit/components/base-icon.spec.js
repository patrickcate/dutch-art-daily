import BaseIcon from '@components/base-icon.vue'

describe('BaseIcon Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        icon: {
          viewBox: '0 0 10 10',
          url: 'test.svg',
        },
      },
    }

    wrapper = createWrapper(BaseIcon, options)
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with custom width and height', () => {
    wrapper = createWrapper(BaseIcon, {
      propsData: {
        ...options.propsData,
        width: '20px',
        height: '20px',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
