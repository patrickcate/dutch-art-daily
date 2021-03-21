import Vue from 'vue'
import BaseCarousel from '@components/base-carousel.vue'

describe('BaseCarousel Component', () => {
  let wrapper
  let options
  let state

  beforeEach(() => {
    const SlideMock = Vue.component('SlideMock', {
      template: '<li></li>',
    })

    options = {
      propsData: {
        name: 'carousel',
      },
      slots: {
        default: [
          '<slide-mock />',
          '<slide-mock />',
          '<slide-mock />',
          '<slide-mock />',
          '<slide-mock />',
          '<slide-mock />',
          '<slide-mock />',
        ],
      },
      stubs: {
        'slide-mock': SlideMock,
      },
    }

    state = {
      state: {
        currentArtworkHeight: 100,
      },
    }

    wrapper = createWrapper(BaseCarousel, options, state)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    wrapper = createWrapper(BaseCarousel, { ...options })

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

  it('all child elements have required `swiper-slide` class', () => {
    expect(wrapper.html()).toEqual(expect.stringMatching('swiper-slide'))
  })

  it('slide changes update activeId and currentSlideIndex', async () => {
    const updateCurrentSlideIndexMock = jest.fn()
    const updateCurrentPageMock = jest.fn()

    wrapper = createWrapper(
      BaseCarousel,
      {
        ...options,
      },
      {
        actions: {
          updateCurrentSlideIndex() {
            updateCurrentSlideIndexMock()
          },
          updateCurrentPage() {
            updateCurrentPageMock()
          },
        },
      }
    )

    await wrapper.vm.$nextTick()

    // Trigger slide change.
    wrapper.vm.$el.swiper.slidePrev()

    expect(updateCurrentSlideIndexMock).toHaveBeenCalled()
    expect(updateCurrentPageMock).toHaveBeenCalled()
  })
})
