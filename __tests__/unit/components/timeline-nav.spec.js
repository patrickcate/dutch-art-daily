import { shallowMount } from '@vue/test-utils'
import TimelineNav from '@components/timeline-nav.vue'

describe('TimelineNav Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(TimelineNav, {
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

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(TimelineNav, {
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

    expect(wrapper).toMatchSnapshot()
  })

  it('beforeMount hook is called', () => {
    const beforeMountMock = jest.fn()

    shallowMount(TimelineNav, {
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

    expect(beforeMountMock).toHaveBeenCalled()
  })
})
