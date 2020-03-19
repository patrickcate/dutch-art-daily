import { shallowMount } from '@vue/test-utils'
import mockData from '@fixtures/mock-data.js'
import BackgroundStack from '@components/background-stack.vue'

describe('BackgroundStack Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(BackgroundStack, {
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            loadedSlides: [],
          },
        },
      },
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(BackgroundStack, {
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            loadedSlides: ['01-01'],
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
    const wrapper = shallowMount(BackgroundStack, {
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            loadedSlides: [],
          },
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('has no active background', () => {
    const wrapper = shallowMount(BackgroundStack, {
      mocks: {
        $store: {
          state: {
            currentPage: '01-01',
            loadedSlides: ['01-01'],
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
