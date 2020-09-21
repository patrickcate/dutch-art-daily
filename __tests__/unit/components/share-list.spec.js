import ShareList from '@components/share-list.vue'

describe('ShareList Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    options = {
      propsData: {
        direction: 'horizontal',
      },
    }

    wrapper = createWrapper(ShareList, options)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('does not render correctly', () => {
    const wrapper = createWrapper(
      ShareList,
      {
        ...options,
      },
      {
        getters: {
          getArtworkById: () => () => {
            return null
          },
        },
      }
    )

    expect(wrapper).toMatchSnapshot()
  })
})
