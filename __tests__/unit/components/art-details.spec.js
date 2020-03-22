import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import ArtDetails from '@components/art-details.vue'

describe('ArtDetails Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ArtDetails, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            slides: [],
          },
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(ArtDetails, {
      data() {
        return {
          detailsHeight: 100,
        }
      },
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            slides: mockData.slides,
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('updates height from emitted event', async () => {
    const wrapper = shallowMount(ArtDetails, {
      data() {
        return {
          detailsHeight: 100,
        }
      },
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            slides: mockData.slides,
          },
        },
      },
    })

    wrapper.vm.updateDetailsHeight(200)
    await wrapper.vm.$nextTick()

    expect(wrapper.attributes('style')).toContain('height: 200px;')
  })
})
