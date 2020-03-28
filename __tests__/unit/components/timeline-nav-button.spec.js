import TimelineNavButton from '@components/timeline-nav-button.vue'

describe('TimelineNavButton Component', () => {
  let wrapper
  let options
  let slideToMock

  beforeEach(() => {
    options = {
      propsData: {
        direction: 'prev',
      },
    }

    wrapper = createWrapper(TimelineNavButton, options, {
      state: {
        currentSlideIndex: 3,
      },
    })

    slideToMock = jest.fn(index => {
      wrapper.vm.$store.dispatch('updateCurrentSlideIndex', index)
    })

    wrapper.vm.$root.swipers.carousel = {
      slideTo(index) {
        slideToMock(index)
      },
    }
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders previous button correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders next button correctly', async () => {
    wrapper.setProps({
      direction: 'next',
    })
    await wrapper.vm.$nextTick()

    expect(wrapper).toMatchSnapshot()
  })

  it('previous button is disabled at beginning', async () => {
    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentSlideIndex: 0,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  it('next button is disabled at end', async () => {
    wrapper.setProps({
      direction: 'next',
    })

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentSlideIndex: 6,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  it('click on previous button goes to previous slide', () => {
    wrapper.trigger('click')

    expect(slideToMock).toHaveBeenCalledWith(2)
    expect(wrapper.vm.$store.state.currentSlideIndex).toBe(2)
  })

  it('click on next button goes to next slide', () => {
    wrapper.setProps({
      direction: 'next',
    })

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentSlideIndex: 0,
    })

    wrapper.trigger('click')

    expect(slideToMock).toHaveBeenCalledWith(1)
    expect(wrapper.vm.$store.state.currentSlideIndex).toBe(1)
  })

  it('click on previous button when at beginning does nothing', () => {
    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentSlideIndex: 0,
    })

    wrapper.vm.toPrevSlide()

    expect(slideToMock).not.toHaveBeenCalled()
  })

  it('click on next button when at end does nothing', () => {
    wrapper.setProps({
      direction: 'next',
    })

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentSlideIndex: 6,
    })

    wrapper.vm.toNextSlide()

    expect(slideToMock).not.toHaveBeenCalled()
  })
})
