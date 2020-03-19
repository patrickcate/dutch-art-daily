import { shallowMount } from '@vue/test-utils'
import { dateId } from '@utils/format-date'
import TimelineNavItem from '@components/timeline-nav-item.vue'

describe('TimelineNavItem Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(TimelineNavItem, {
      propsData: {
        id: '01-01',
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(TimelineNavItem, {
      propsData: {
        id: '01-01',
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('renders with date label', () => {
    const todaysDateId = dateId(new Date())

    const wrapper = shallowMount(TimelineNavItem, {
      propsData: {
        id: todaysDateId,
      },
      computed: {
        breakpoint() {
          return {
            md: true,
          }
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('goes to clicked slide', async () => {
    const slideToMock = jest.fn()

    const wrapper = shallowMount(TimelineNavItem, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '12-12',
          },
          getters: {
            getSlideIndexById() {
              return 1
            },
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

    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(slideToMock).toHaveBeenCalled()
  })

  it('stays on current slide when clicked', async () => {
    const slideToMock = jest.fn()

    const wrapper = shallowMount(TimelineNavItem, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
          getters: {
            getSlideIndexById() {
              return 1
            },
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

    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(slideToMock).not.toHaveBeenCalled()
  })
})
