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
            currentPage: '01-01',
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
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
            currentPage: '01-01',
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
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
            currentPage: '01-01',
          },
          getters: {
            getArtworkById() {
              return null
            },
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('emits scroll height on component mount', async () => {
    const wrapper = shallowMount(DetailsSlide, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
        },
      },
    })

    await wrapper.vm.$nextTick()
    const emitted = wrapper.emitted()

    expect(emitted['details-have-changed']).toBeDefined()
  })

  it('emits scroll height on active id/details match', async () => {
    const wrapper = shallowMount(DetailsSlide, {
      propsData: {
        id: '12-12',
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
          getters: {
            getArtworkById() {
              return mockData.artwork
            },
          },
        },
      },
    })

    const emitted = wrapper.emitted()

    expect(emitted['details-have-changed']).toBeUndefined()

    wrapper.setProps({ id: '01-01' })
    await wrapper.vm.$nextTick()

    expect(emitted['details-have-changed']).toBeDefined()
  })
})
