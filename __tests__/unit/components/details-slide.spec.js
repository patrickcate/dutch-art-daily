import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import DetailsSlide from '@components/details-slide.vue'

describe('DetailsSlide Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(DetailsSlide, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
          dispatch() {},
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(DetailsSlide, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentDetailsHeight: 400,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
          dispatch() {},
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('does not render without data', () => {
    const wrapper = shallowMount(DetailsSlide, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentDetailsHeight: 400,
          },
          getters: {
            getArtworkById() {
              return null
            },
          },
          dispatch() {},
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('set scroll height on active id/details match', async () => {
    let currentArtworkHeight = null
    const updateCurrentDetailsHeightMock = jest.fn(height => {
      currentArtworkHeight = height
    })

    const wrapper = shallowMount(DetailsSlide, {
      propsData: {
        id: '12-12',
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentDetailsHeight: 400,
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
          dispatch(action, payload) {
            if (action === 'updateCurrentDetailsHeight') {
              updateCurrentDetailsHeightMock(100)
            }
          },
        },
      },
    })

    expect(wrapper.vm.$store.state.currentDetailsHeight).toBe(400)

    wrapper.setProps({ id: '01-01' })
    await wrapper.vm.$nextTick()

    expect(updateCurrentDetailsHeightMock).toHaveBeenCalled()
    expect(currentArtworkHeight).toBe(100)
  })
})
