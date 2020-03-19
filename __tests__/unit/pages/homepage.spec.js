import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import Homepage from '@pages/index.vue'

describe('Homepage', () => {
  it('should be a Vue instance', () => {
    const localVue = createLocalVue()
    localVue.use(VueMeta, { keyName: 'head' })

    const wrapper = shallowMount(Homepage, {
      mocks: {
        $homepageRedirect() {},
      },
      localVue,
    })

    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('render an empty string', () => {
    const localVue = createLocalVue()
    localVue.use(VueMeta, { keyName: 'head' })

    process.server = true

    const wrapper = shallowMount(Homepage, {
      mocks: {
        $homepageRedirect() {},
      },
      methods: {
        $icon() {
          return true
        },
      },
      localVue,
    })

    expect(wrapper).toMatchSnapshot()
  })
})
