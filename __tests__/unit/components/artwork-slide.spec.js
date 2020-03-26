import { shallowMount } from '@vue/test-utils'
import ArtworkSlide from '@components/artwork-slide.vue'

describe('ArtworkSlide Component', () => {
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
    const wrapper = shallowMount(ArtworkSlide, {
      propsData: {
        ...artworkData,
      },
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(ArtworkSlide, {
      propsData: {
        ...artworkData,
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
