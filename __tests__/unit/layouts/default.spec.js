import DefaultLayout from '@layouts/default.vue'

describe('DefaultLayout Layout', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      mocks: {
        $route: {
          params: {
            date: '01-01',
          },
        },
      },
    }

    wrapper = createWrapper(DefaultLayout, options)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('creates root swiper object if undefined', () => {
    expect(wrapper.vm.$root.swipers).not.toBeUndefined()
    expect(wrapper.vm.$root).toHaveProperty('swipers')
  })

  it('sets active id to current route', () => {
    const updateCurrentPageMock = jest.fn()

    wrapper = createWrapper(
      DefaultLayout,
      {
        ...options,
        parentComponent: null,
      },
      {
        state: {
          activeId: null,
        },
        actions: {
          updateCurrentPage(store, payload) {
            updateCurrentPageMock(payload)
          },
        },
      }
    )

    expect(updateCurrentPageMock).toHaveBeenCalledWith('01-01')
  })
})
