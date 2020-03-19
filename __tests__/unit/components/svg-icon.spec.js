import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@components/svg-icon.vue'

describe('SvgIcon Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(SvgIcon, {
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
    const wrapper = shallowMount(SvgIcon, {
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
    const wrapper = shallowMount(SvgIcon, {
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
