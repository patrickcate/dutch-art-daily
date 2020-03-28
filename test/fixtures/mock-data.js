/* eslint-disable camelcase */
import BaseIconMock from '@fixtures/base-icon-mock.vue'
const slide_12_26 = require('../../data/12/12-26.json')
const slide_12_27 = require('../../data/12/12-27.json')
const slide_12_28 = require('../../data/12/12-28.json')
const slide_12_29 = require('../../data/12/12-29.json')
const slide_12_30 = require('../../data/12/12-30.json')
const slide_12_31 = require('../../data/12/12-31.json')
const slide_01_01 = require('../../data/01/01-01.json')

export default {
  artwork: {
    ...slide_01_01,
  },
  imageWidths: {
    xs3: 640,
    xs2: 800,
    xs: 960,
    sm: 1120,
    md: 1280,
    lg: 1440,
    xl: 1600,
    xl2: 1760,
    xl3: 1920,
  },
  stubs: {
    'base-icon': BaseIconMock,
    'base-carousel': true,
  },
  store: {
    state: {
      activeId: '01-01',
      slides: [
        { ...slide_12_26 },
        { ...slide_12_27 },
        { ...slide_12_28 },
        { ...slide_12_29 },
        { ...slide_12_30 },
        { ...slide_12_31 },
        { ...slide_01_01 },
      ],
    },
    getters: {
      getArtworkById: () => () => {
        return {
          ...slide_01_01,
        }
      },
      getSlideIndexById: () => () => {
        return 6
      },
    },
  },
}
