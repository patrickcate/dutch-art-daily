/* eslint-disable no-import-assign */

import * as formatDate from '@utils/format-date'
import TheLogo from '@components/the-logo.vue'

describe('TheLogo Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    wrapper = createWrapper(TheLogo, options)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('goes to first slide when clicked', async () => {
    const slideToMock = jest.fn()

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      currentSlideIndex: 0,
      activeId: '12-26',
    })
    await wrapper.vm.$nextTick()

    wrapper.vm.$root.swipers.carousel = {
      slideTo(index) {
        slideToMock(index)
      },
    }

    await wrapper.find('a').trigger('click')

    expect(slideToMock).toHaveBeenCalledWith(6)
  })

  it('redirect to page when clicked', async () => {
    const routerPushMock = jest.fn()
    const dateIdMock = jest.fn()

    dateIdMock.mockReturnValueOnce(null).mockReturnValueOnce('12-12')

    // Override imported function.
    formatDate.dateId = dateIdMock

    wrapper = createWrapper(
      TheLogo,
      {
        mocks: {
          $router: {
            push(route) {
              routerPushMock(route)
            },
          },
          dateId(date) {
            dateIdMock(date)
          },
        },
      },
      {
        getters: {
          getSlideIndexById: () => () => {
            return -1
          },
        },
      }
    )

    await wrapper.find('a').trigger('click')

    expect(routerPushMock).toHaveBeenCalledWith('/')

    await wrapper.find('a').trigger('click')

    expect(routerPushMock).toHaveBeenCalledWith('/12-12')
  })
})
