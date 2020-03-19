import { shallowMount } from '@vue/test-utils'
import TheFooter from '@components/the-footer.vue'

describe('TheFooter Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(TheFooter)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(TheFooter)
    expect(wrapper).toMatchSnapshot()
  })
})
