import DetailsSlide from '@components/details-slide.vue'

describe('DetailsSlide Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        id: '01-01',
      },
    }

    wrapper = createWrapper(DetailsSlide, options)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('does not render without data', () => {
    wrapper = createWrapper(DetailsSlide, options, {
      getters: {
        getArtworkById: () => () => {
          return null
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })
})
