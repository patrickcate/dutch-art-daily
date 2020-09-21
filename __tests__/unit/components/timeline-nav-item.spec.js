import { dateId } from '@utils/format-date'
import TimelineNavItem from '@components/timeline-nav-item.vue'
import { getters as defaultGetters } from '~/store/index.js'

describe('TimelineNavItem Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        id: '01-01',
      },
      computed: {
        breakpoint() {
          return {
            md: true,
          }
        },
      },
    }

    wrapper = createWrapper(TimelineNavItem, options)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with date label', () => {
    const todaysDateId = dateId(new Date())

    wrapper = createWrapper(TimelineNavItem, {
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

    wrapper = createWrapper(
      TimelineNavItem,
      {
        ...options,
        propsData: {
          id: '12-30',
        },
      },
      {
        getters: defaultGetters,
      }
    )

    wrapper.vm.$root.swipers.carousel = {
      slideTo(index) {
        slideToMock(index)
      },
    }

    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(slideToMock).toHaveBeenCalledWith(4)
  })

  it('stays on current slide when clicked', async () => {
    const slideToMock = jest.fn()

    wrapper = createWrapper(
      TimelineNavItem,
      {
        ...options,
        propsData: {
          id: '01-01',
        },
      },
      {
        getters: defaultGetters,
      }
    )

    wrapper.vm.$root.swipers.carousel = {
      slideTo(index) {
        slideToMock(index)
      },
    }

    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(slideToMock).not.toHaveBeenCalled()
  })
})
