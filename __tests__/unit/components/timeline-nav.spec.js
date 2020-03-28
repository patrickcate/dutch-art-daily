import TimelineNav from '@components/timeline-nav.vue'

describe('TimelineNav Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    wrapper = createWrapper(TimelineNav, options, {
      state: {
        slides: [],
      },
      actions: {
        updatePaginationNumber() {},
      },
    })

    wrapper.vm.$root.swipers.timeline = {
      params: {
        slidesPerView: null,
      },
    }
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('beforeMount hook is called', () => {
    const beforeMountMock = jest.fn()

    wrapper = createWrapper(TimelineNav, options, {
      state: {
        slides: [],
      },
      actions: {
        updatePaginationNumber() {
          beforeMountMock()
        },
      },
    })

    expect(beforeMountMock).toHaveBeenCalled()
  })

  // TODO: Test that pagination number changes based on screen size.
})
