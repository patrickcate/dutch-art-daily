import { shallowMount } from '@vue/test-utils'
import TimelineNav from '@components/timeline-nav.vue'

describe('TimelineNav Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(TimelineNav, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            paginationNumber: 3,
            slides: [],
          },
          dispatch() {},
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
        timeline: null,
      },
    }

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(TimelineNav, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            paginationNumber: 3,
            slides: [],
          },
          dispatch() {},
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
        timeline: {
          params: {
            slidesPerView: null,
          },
        },
      },
    }

    expect(wrapper).toMatchSnapshot()
  })

  it('beforeMount hook is called', () => {
    const beforeMountMock = jest.fn()

    const wrapper = shallowMount(TimelineNav, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            paginationNumber: 3,
            slides: [],
          },
          dispatch() {
            beforeMountMock()
          },
        },
      },
    })

    wrapper.vm.$root = {
      swipers: {
        timeline: {
          params: {
            slidesPerView: null,
          },
        },
      },
    }

    expect(beforeMountMock).toHaveBeenCalled()
  })
})
