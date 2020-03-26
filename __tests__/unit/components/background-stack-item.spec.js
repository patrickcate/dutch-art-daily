import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import BackgroundStackItem from '@components/background-stack-item.vue'

describe('BackgroundStackItem Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(BackgroundStackItem, {
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
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(BackgroundStackItem, {
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
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('has no active background', () => {
    const wrapper = shallowMount(BackgroundStackItem, {
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
          state: {
            activeId: '',
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
})
