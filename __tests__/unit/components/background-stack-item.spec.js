import BackgroundStackItem from '@components/background-stack-item.vue'

describe('BackgroundStackItem Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        id: '01-01',
      },
    }

    wrapper = createWrapper(BackgroundStackItem, options)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has no active background', () => {
    wrapper = createWrapper(BackgroundStackItem, options, {
      state: {
        activeId: '',
      },
      getters: {
        getArtworkById: () => () => {
          return null
        },
      },
    })

    expect(wrapper).toMatchSnapshot()
  })
})
