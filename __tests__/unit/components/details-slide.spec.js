import DetailsSlide from '@components/details-slide.vue'

describe('DetailsSlide Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        id: '01-01',
      },
    }

    wrapper = createWrapper(DetailsSlide, options)
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('does not render without data', () => {
    wrapper = createWrapper(DetailsSlide, options, {
      getters: {
        getArtworkById: () => () => {
          return null
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('set scroll height on active id/details match', async () => {
    const updateCurrentDetailsHeightMock = jest.fn(height => {
      wrapper.vm.$store.commit('SET_CURRENT_DETAILS_HEIGHT', height)
    })

    wrapper = createWrapper(
      DetailsSlide,
      {
        propsData: {
          id: '12-27',
        },
      },
      {
        actions: {
          updateCurrentDetailsHeight() {
            updateCurrentDetailsHeightMock(100)
          },
        },
      }
    )

    expect(wrapper.vm.$store.state.currentDetailsHeight).toBe(400)

    wrapper.setProps({
      id: '01-01',
    })
    await wrapper.vm.$nextTick()

    expect(updateCurrentDetailsHeightMock).toHaveBeenCalledWith(100)
    expect(wrapper.vm.$store.state.currentDetailsHeight).toBe(100)
  })
})
