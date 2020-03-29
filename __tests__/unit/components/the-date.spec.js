import TheDate from '@components/the-date.vue'

describe('TheDate Component', () => {
  let wrapper
  let options

  beforeEach(() => {
    wrapper = createWrapper(TheDate, options)
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders correctly', () => {
    process.client = true

    expect(wrapper).toMatchSnapshot()
  })

  it('does not call set setBoundingBox() if no child elements', () => {
    const setBoundingBoxMock = jest.fn()

    options = {
      mocks: {
        setBoundingBox() {
          setBoundingBoxMock()
        },
      },
    }

    wrapper = createWrapper(TheDate, options)
    wrapper.vm.$children = false

    expect(setBoundingBoxMock).not.toHaveBeenCalled()
  })

  // TODO: Test that changing date renders new date correctly
  // TODO: Test style top/left are correctly added.
})
