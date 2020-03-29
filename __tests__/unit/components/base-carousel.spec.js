import BaseCarousel from '@components/base-carousel.vue'

describe('BaseCarousel Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        name: 'carousel',
      },
    }

    wrapper = createWrapper(BaseCarousel, options, {
      state: {
        currentArtworkHeight: 100,
      },
    })
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    wrapper = createWrapper(
      BaseCarousel,
      { ...options },
      {
        state: {
          currentArtworkHeight: 100,
        },
      }
    )

    wrapper.vm.$root.swipers = {
      carousel: {
        controller: {
          control: {},
        },
      },
      timeline: {
        controller: {
          control: {},
        },
      },
      details: {
        controller: {
          control: {},
        },
      },
    }

    expect(wrapper).toMatchSnapshot()
  })
})
