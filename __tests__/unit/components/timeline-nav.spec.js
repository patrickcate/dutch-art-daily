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
    expect(wrapper.exists()).toBeTruthy()
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

  it('visible timeline items update from store state', async () => {
    expect(wrapper.vm.$root.swipers.timeline.params.slidesPerView).toBe(3)

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      paginationNumber: 5,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$root.swipers.timeline.params.slidesPerView).toBe(5)

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      paginationNumber: 3,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$root.swipers.timeline.params.slidesPerView).toBe(3)
  })
})
