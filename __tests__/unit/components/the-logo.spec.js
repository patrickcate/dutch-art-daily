import { shallowMount } from '@vue/test-utils'
import * as formatDate from '@utils/format-date'
import TheLogo from '@components/the-logo.vue'
import BaseIconMock from '@fixtures/base-icon-mock.vue'

describe('TheLogo Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(TheLogo, {
      stubs: {
        'base-icon': BaseIconMock,
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(TheLogo, {
      stubs: {
        'base-icon': BaseIconMock,
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('goes to first slide when clicked', async () => {
    const slideToMock = jest.fn()

    const wrapper = shallowMount(TheLogo, {
      stubs: {
        'base-icon': BaseIconMock,
      },
      mocks: {
        $store: {
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

    wrapper.find('a').trigger('click')
    await wrapper.vm.$nextTick()

    expect(slideToMock).toHaveBeenCalled()
  })

  it('redirect to page when clicked', async () => {
    const currentRoute = []
    const routerPushMock = jest.fn(route => {
      currentRoute.push(route)
    })

    const dateIdMock = jest.fn()
    dateIdMock.mockReturnValueOnce(null).mockReturnValueOnce('01-01')
    formatDate.dateId = dateIdMock

    const wrapper = shallowMount(TheLogo, {
      stubs: {
        'base-icon': BaseIconMock,
      },
      mocks: {
        $store: {
          getters: {
            getSlideIndexById() {
              return -1
            },
          },
        },
        $router: {
          push(route) {
            routerPushMock(route)
          },
        },
        dateId(date) {
          dateIdMock(date)
        },
      },
    })

    wrapper.find('a').trigger('click')
    await wrapper.vm.$nextTick()

    expect(routerPushMock).toHaveBeenCalled()
    expect(currentRoute[0]).toBe('/')

    wrapper.find('a').trigger('click')
    await wrapper.vm.$nextTick()

    expect(currentRoute[1]).toBe('/01-01')
  })
})
