/* eslint-disable camelcase */
import * as slide_12_26 from '~/data/12/12-26.json'
import * as slide_12_27 from '~/data/12/12-27.json'
import * as slide_12_28 from '~/data/12/12-28.json'
import * as slide_12_29 from '~/data/12/12-29.json'
import * as slide_12_30 from '~/data/12/12-30.json'
import * as slide_12_31 from '~/data/12/12-31.json'
import * as slide_01_01 from '~/data/01/01-01.json'

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
