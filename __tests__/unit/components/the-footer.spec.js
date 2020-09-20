import TheFooter from '@components/the-footer.vue'

describe('TheFooter Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(TheFooter)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
