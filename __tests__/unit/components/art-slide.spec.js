import { shallowMount } from '@vue/test-utils'
import ArtSlide from '@components/art-slide.vue'

describe('ArtSlide Component', () => {
  let artworkData

  beforeEach(() => {
    artworkData = {
      artwork: {
        id: '01-01',
        orientation: 'portrait',
      },
    }
  })

  it('is a Vue instance', () => {
    const wrapper = shallowMount(ArtSlide, {
      propsData: {
        ...artworkData,
      },
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(ArtSlide, {
      propsData: {
        ...artworkData,
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
