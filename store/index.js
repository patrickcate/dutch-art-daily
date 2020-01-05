export const state = () => ({
  currentPage: null,
  slides: [],
  loadedSlides: {},
  currentSlideIndex: 6,
  progress: 1,
  currentHeight: 1000,
  paginationNumber: 3,
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
})

export const getters = {
  getArtById: state => id => {
    return state.slides.filter(item => item.id === id)[0]
  },
  getSlideIndexById: state => id => {
    return state.slides.findIndex(item => item.id === id)
  },
}

export const mutations = {
  SET_CURRENT_PAGE(state, payload) {
    state.currentPage = payload
  },
  SET_SLIDES(state, payload) {
    state.slides = payload
  },
  SET_LOADED_SLIDES(state, payload) {
    state.loadedSlides = {
      ...state.loadedSlides,
      ...{
        [payload]: payload,
      },
    }
  },
  SET_CURRENT_SLIDE_INDEX(state, payload) {
    state.currentSlideIndex = payload
  },
  SET_PROGRESS(state, payload) {
    state.progress = payload
  },
  SET_CURRENT_HEIGHT(state, payload) {
    state.currentHeight = payload
  },
  SET_PAGINATION_NUMBER(state, payload) {
    state.paginationNumber = payload
  },
}

export const actions = {
  setSlideData({ commit }, slides) {
    commit('SET_SLIDES', slides)
  },
  updatePaginationNumber({ commit }) {
    const mql = window.matchMedia('(max-width: 600px)')

    if (mql.matches) {
      commit('SET_PAGINATION_NUMBER', 3)
    } else {
      commit('SET_PAGINATION_NUMBER', 5)
    }
  },
  setCurrentPage({ state, commit }, id) {
    if (state.currentPage !== id) {
      commit('SET_CURRENT_PAGE', id)
    }

    if (!state.loadedSlides[id]) {
      commit('SET_LOADED_SLIDES', id)
    }
  },
}
