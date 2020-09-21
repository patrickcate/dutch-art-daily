import TheHeader from '@components/the-header.vue'

describe('TheHeader Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(TheHeader)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('shows share list on larger screen sizes', () => {
    wrapper = createWrapper(TheHeader, {
      computed: {
        breakpoint() {
          return {
            md: true,
          }
        },
      },
    })

    expect(wrapper.findComponent({ name: 'ShareList' }).isVisible()).toBe(true)
    expect(wrapper.findComponent({ name: 'ShareDropdown' }).isVisible()).toBe(
      false
    )
  })

  it('shows share dropdown on smaller screen sizes', () => {
    wrapper = createWrapper(TheHeader, {
      computed: {
        breakpoint() {
          return {
            md: false,
          }
        },
      },
    })

    expect(wrapper.findComponent({ name: 'ShareList' }).isVisible()).toBe(false)
    expect(wrapper.findComponent({ name: 'ShareDropdown' }).isVisible()).toBe(
      true
    )
  })
})
