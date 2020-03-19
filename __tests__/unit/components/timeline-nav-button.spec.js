import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import SvgIconMock from '@fixtures/svg-icon-mock.vue'
import TimelineNavButton from '@components/timeline-nav-button.vue'

describe('TimelineNavButton Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'prev',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 6,
            slides: [],
          },
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders previous button correctly', () => {
    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'prev',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 3,
            slides: mockData.slides,
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('renders next button correctly', () => {
    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'next',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 3,
            slides: mockData.slides,
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('previous button is disabled at beginning', () => {
    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'prev',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 0,
            slides: mockData.slides,
          },
        },
      },
    })

    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  it('next button is disabled at end', () => {
    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'next',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 6,
            slides: mockData.slides,
          },
        },
      },
    })

    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  it('click on previous button goes to previous slide', async () => {
    let currentSlideIndex = 6
    const slideToMock = jest.fn(() => {
      currentSlideIndex = currentSlideIndex - 1
    })

    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'prev',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 6,
            slides: mockData.slides,
          },
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
        carousel: {
          slideTo() {
            slideToMock()
          },
        },
      },
    }

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    expect(slideToMock).toHaveBeenCalled()
    expect(currentSlideIndex).toBe(5)
  })

  it('click on next button goes to next slide', async () => {
    let currentSlideIndex = 0
    const slideToMock = jest.fn(() => {
      currentSlideIndex = currentSlideIndex + 1
    })

    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'next',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 0,
            slides: mockData.slides,
          },
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
        carousel: {
          slideTo() {
            slideToMock()
          },
        },
      },
    }

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    expect(slideToMock).toHaveBeenCalled()
    expect(currentSlideIndex).toBe(1)
  })

  it('click on previous button when at beginning does nothing', () => {
    let currentSlideIndex = 0
    const slideToMock = jest.fn(() => {
      currentSlideIndex = currentSlideIndex - 1
    })

    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'prev',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 0,
            slides: mockData.slides,
          },
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
        carousel: {
          slideTo() {
            slideToMock()
          },
        },
      },
    }

    wrapper.vm.toPrevSlide()

    expect(slideToMock).not.toHaveBeenCalled()
    expect(currentSlideIndex).toBe(0)
  })

  it('click on next button when at end does nothing', () => {
    let currentSlideIndex = 6
    const slideToMock = jest.fn(() => {
      currentSlideIndex = currentSlideIndex + 1
    })

    const wrapper = shallowMount(TimelineNavButton, {
      propsData: {
        direction: 'next',
      },
      stubs: {
        'svg-icon': SvgIconMock,
      },
      mocks: {
        $store: {
          state: {
            currentSlideIndex: 6,
            slides: mockData.slides,
          },
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
        carousel: {
          slideTo() {
            slideToMock()
          },
        },
      },
    }

    wrapper.vm.toNextSlide()

    expect(slideToMock).not.toHaveBeenCalled()
    expect(currentSlideIndex).toBe(6)
  })
})
