import { shallowMount } from '@vue/test-utils'
import BaseIcon from '@components/base-icon.vue'

describe('BaseIcon Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        icon: {
          viewBox: '0 0 10 10',
          url: 'test.svg',
        },
      },
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        icon: {
          viewBox: '0 0 10 10',
          url: 'test.svg',
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with custom width and height', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        icon: {
          viewBox: '0 0 10 10',
          url: 'test.svg',
        },
        width: '20px',
        height: '20px',
      },
    })

    expect(wrapper).toMatchSnapshot()
  })
})
