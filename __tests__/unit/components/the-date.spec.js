import subDays from 'date-fns/subDays'
import { dateId } from '@utils/format-date.js'
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

  it('displays `Today` if matches todays date', async () => {
    const today = dateId(new Date())

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      activeId: today,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.artwork-date__label').html()).toEqual(
      expect.stringMatching('Today')
    )
  })

  it('displays `Yeserday` if matches yesterdays date', async () => {
    const yesterday = dateId(subDays(new Date(), 1))

    wrapper.vm.$store.replaceState({
      ...wrapper.vm.$store.state,
      activeId: yesterday,
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.artwork-date__label').html()).toEqual(
      expect.stringMatching('Yesterday')
    )
  })

  it('date-related html elements have top and left pixel dimensions set', async () => {
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.artwork-date__item').html()).toEqual(
      expect.stringMatching(/\b(\w*(style|left|top)\w*)\b/)
    )
  })

  it('always render `Today` date label when statically generated', () => {
    process.static = true
    process.server = true

    wrapper = createWrapper(TheDate, options)

    expect(wrapper.find('.artwork-date__label').html()).toEqual(
      expect.stringMatching('Today')
    )
  })
})
