import { shallowMount, mount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import SwiperCarousel from '@components/swiper-carousel.vue'
// import ArtSlide from '@components/art-slide.vue'

describe('SwiperCarousel Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(SwiperCarousel, {
      propsData: {
        name: 'carousel',
      },
      stub: {
        'carousel-slide': '<li></li>',
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: '01-01',
            currentHeight: 100,
            slides: mockData.slides,
          },
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
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
      },
    }

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = mount(SwiperCarousel, {
      propsData: {
        name: 'carousel',
      },
      // stub: {
      //   'art-slide': ArtSlide,
      // },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: '01-01',
            currentHeight: 100,
            slides: mockData.slides,
          },
        },
      },
      // slots: {
      //   default: ArtSlide,
      // },
    })

    wrapper.vm.$root = {
      swipers: {
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
      },
    }

    expect(wrapper).toMatchSnapshot()
  })
})
