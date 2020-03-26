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
            currentArtworkHeight: 100,
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
            currentArtworkHeight: 100,
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

  // it('timeline switches pagination count depending on screen size', async () => {
  //   Object.defineProperty(window, 'matchMedia', {
  //     writable: true,
  //     value: jest.fn().mockImplementation(query => ({
  //       matches: false,
  //       media: query,
  //       onchange: null,
  //       addListener: jest.fn(), // deprecated
  //       removeListener: jest.fn(), // deprecated
  //       addEventListener: jest.fn(),
  //       removeEventListener: jest.fn(),
  //       dispatchEvent: jest.fn(),
  //     })),
  //   })

  //   const wrapper = mount(BaseCarousel, {
  //     propsData: {
  //       name: 'timeline',
  //     },
  //     mocks: {
  //       $store: {
  //         state: {
  //           currentSlideIndex: '01-01',
  //           currentArtworkHeight: 100,
  //           slides: mockData.slides,
  //           paginationNumber: 3,
  //         },
  //       },
  //     },
  //   })

  //   wrapper.vm.$root = {
  //     swipers: {
  //       timeline: {
  //         params: {
  //           slidesPerView: null,
  //         },
  //       },
  //     },
  //   }

  //   // window.matchMedia = () => {
  //   //   return true
  //   // }
  //   await wrapper.vm.$nextTick()
  //   window.dispatchEvent(new Event('resize'))
  //   // console.log(window)
  //   // wrapper.find('.swiper-container').call('resize')
  //   // console.log(wrapper.find('.swiper-container'))
  //   // expect(wrapper).toMatchSnapshot()
  // })
})
