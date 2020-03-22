import { shallowMount, mount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import BaseCarousel from '@components/base-carousel.vue'

describe('BaseCarousel Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(BaseCarousel, {
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
    const wrapper = mount(BaseCarousel, {
      propsData: {
        name: 'carousel',
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

    expect(wrapper).toMatchSnapshot()
  })
})
