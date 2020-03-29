import mockData from '@fixtures/mock-data.js'
import ArtworkSlide from '@components/artwork-slide.vue'

describe('ArtworkSlide Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        artwork: mockData.artwork,
      },
    }

    wrapper = createWrapper(ArtworkSlide, options)
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
