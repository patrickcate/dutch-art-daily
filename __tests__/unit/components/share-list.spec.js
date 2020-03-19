import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import ShareList from '@components/share-list.vue'
import SvgIconMock from '@fixtures/svg-icon-mock.vue'

describe('ShareList Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(ShareList, {
      propsData: {
        direction: 'horizontal',
      },
      stubs: {
        'svg-icon': SvgIconMock,
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
    const wrapper = shallowMount(ShareList, {
      stubs: {
        'svg-icon': SvgIconMock,
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

  it('does not render correctly', () => {
    const wrapper = shallowMount(ShareList, {
      stubs: {
        'svg-icon': SvgIconMock,
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
})
