import { shallowMount } from '@vue/test-utils'
import ArtDate from '@components/art-date.vue'

describe('ArtDate Component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ArtDate, {
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    process.client = true

    const wrapper = shallowMount(ArtDate, {
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('does not call set setBoundingBox() if no child elements', () => {
    const setBoundingBoxMock = jest.fn()

    const wrapper = shallowMount(ArtDate, {
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
          },
        },
        setBoundingBox() {
          setBoundingBoxMock()
        },
      },
    })

    wrapper.vm.$children = false

    expect(setBoundingBoxMock).not.toHaveBeenCalled()
  })

  // TODO: Test that changing date renders new date correctly
  // TODO: Test style top/left are correcly added.
})
