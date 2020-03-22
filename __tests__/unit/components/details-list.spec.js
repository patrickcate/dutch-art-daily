import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import BaseIconMock from '@fixtures/base-icon-mock.vue'
import DetailsList from '@components/details-list.vue'

describe('DetailsList Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(DetailsList, {
      stubs: {
        'base-icon': BaseIconMock,
      },
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
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
    const wrapper = shallowMount(DetailsList, {
      stubs: {
        'base-icon': BaseIconMock,
      },
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
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

  it('does not render correctly', () => {
    const wrapper = shallowMount(DetailsList, {
      stubs: {
        'base-icon': BaseIconMock,
      },
      propsData: {
        id: '01-01',
      },
      mocks: {
        $store: {
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
