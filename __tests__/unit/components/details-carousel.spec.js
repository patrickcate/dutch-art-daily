import DetailsCarousel from '@components/details-carousel.vue'

describe('DetailsCarousel Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(
      DetailsCarousel,
      {},
      {
        state: {
          currentDetailsHeight: null,
        },
      }
    )
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', async () => {
    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentDetailsHeight: 100,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  it('updates height from store state', async () => {
    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentDetailsHeight: 100,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.attributes('style')).toContain('height: 100px;')

    wrapper.vm.$store.state.currentDetailsHeight = 200
    await wrapper.vm.$nextTick()

    expect(wrapper.attributes('style')).toContain('height: 200px;')
  })
})
