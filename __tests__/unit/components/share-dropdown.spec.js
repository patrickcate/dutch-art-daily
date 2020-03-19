import { shallowMount } from '@vue/test-utils'
import ShareDropdown from '@components/share-dropdown.vue'
import SvgIconMock from '@fixtures/svg-icon-mock.vue'

describe('ShareDropdown Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ShareDropdown, {
      stubs: {
        'svg-icon': SvgIconMock,
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(ShareDropdown, {
      stubs: {
        'svg-icon': SvgIconMock,
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('toggles open and closed', async () => {
    const wrapper = shallowMount(ShareDropdown, {
      stubs: {
        'svg-icon': SvgIconMock,
      },
    })

    expect(wrapper.classes()).not.toContain('share-dropdown--is-expanded')
    expect(wrapper.find('button').attributes('aria-expanded')).toBeUndefined()

    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('share-dropdown--is-expanded')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })
})
