import { shallowMount } from '@vue/test-utils'
import TheHeader from '@components/the-header.vue'

describe('TheHeader Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(TheHeader)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(TheHeader)
    expect(wrapper).toMatchSnapshot()
  })

  it('shows share list on larger screen sizes', () => {
    const wrapper = shallowMount(TheHeader, {
      computed: {
        breakpoint() {
          return {
            md: true,
          }
        },
      },
    })

    expect(wrapper.find({ name: 'ShareList' }).isVisible()).toBe(true)
    expect(wrapper.find({ name: 'ShareDropdown' }).isVisible()).toBe(false)
  })

  it('shows share dropdown on smaller screen sizes', () => {
    const wrapper = shallowMount(TheHeader, {
      computed: {
        breakpoint() {
          return {
            md: false,
          }
        },
      },
    })

    expect(wrapper.find({ name: 'ShareList' }).isVisible()).toBe(false)
    expect(wrapper.find({ name: 'ShareDropdown' }).isVisible()).toBe(true)
  })
})
