import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import DetailsCarousel from '@components/details-carousel.vue'

describe('DetailsCarousel Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(DetailsCarousel, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            slides: [],
          },
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(DetailsCarousel, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentDetailsHeight: 100,
            slides: mockData.slides,
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('updates height from emitted event', async () => {
    const wrapper = shallowMount(DetailsCarousel, {
      stubs: {
        'base-carousel': true,
      },
      mocks: {
        $store: {
          state: {
            activeId: '01-01',
            currentDetailsHeight: 100,
            slides: mockData.slides,
          },
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.attributes('style')).toContain('height: 100px;')

    wrapper.vm.$store.state.currentDetailsHeight = 200
    await wrapper.vm.$nextTick()

    expect(wrapper.attributes('style')).toContain('height: 200px;')
  })
})
