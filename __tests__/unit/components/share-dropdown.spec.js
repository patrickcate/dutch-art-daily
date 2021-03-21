import ShareDropdown from '@components/share-dropdown.vue'

describe('ShareDropdown Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(ShareDropdown)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('toggles open and closed', async () => {
    expect(wrapper.classes()).not.toContain('share-dropdown--is-expanded')
    expect(wrapper.find('button').attributes('aria-expanded')).toBeUndefined()

    await wrapper.find('button').trigger('click')

    expect(wrapper.classes()).toContain('share-dropdown--is-expanded')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })
})
