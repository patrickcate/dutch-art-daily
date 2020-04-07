import { generateRoutes } from '@utils/generate-routes'

export const state = () => ({
  activeId: null,
  slides: [],
  loadedSlides: {},
  currentSlideIndex: 6,
  currentArtworkHeight: 800,
  currentDetailsHeight: 400,
  paginationNumber: 3,
})

export const getters = {
  getArtworkById: state => id => {
    return state.slides.filter(item => item.id === id)[0]
  },
  getSlideIndexById: state => id => {
    return state.slides.findIndex(item => item.id === id)
  },
}

export const mutations = {
  SET_ACTIVE_ID(state, payload) {
    state.activeId = payload
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
  SET_CURRENT_ARTWORK_HEIGHT(state, payload) {
    state.currentArtworkHeight = payload
  },
  SET_CURRENT_DETAILS_HEIGHT(state, payload) {
    state.currentDetailsHeight = payload
  },
  SET_PAGINATION_NUMBER(state, payload) {
    state.paginationNumber = payload
  },
}

export const actions = {
  updateCurrentSlideIndex({ commit }, slideIndex) {
    if (state.currentSlideIndex !== slideIndex) {
      commit('SET_CURRENT_SLIDE_INDEX', slideIndex)
    }
  },
  updateSlideData({ commit }, slides) {
    commit('SET_SLIDES', slides)
  },
  updateLoadedSlides({ state, commit }, id) {
    if (!state.loadedSlides[id]) {
      commit('SET_LOADED_SLIDES', id)
    }
  },
  updateCurrentArtworkHeight({ state, commit }, artworkHeight) {
    if (state.currentArtworkHeight !== artworkHeight) {
      commit('SET_CURRENT_ARTWORK_HEIGHT', artworkHeight)
    }
  },
  updateCurrentDetailsHeight({ state, commit }, detailsHeight) {
    if (state.currentDetailsHeight !== detailsHeight) {
      commit('SET_CURRENT_DETAILS_HEIGHT', detailsHeight)
    }
  },
  updatePaginationNumber({ state, commit }) {
    const mql = window.matchMedia('(max-width: 600px)')

    if (mql.matches && state.paginationNumber !== 3) {
      commit('SET_PAGINATION_NUMBER', 3)
    } else if (!mql.matches && state.paginationNumber !== 5) {
      commit('SET_PAGINATION_NUMBER', 5)
    }
  },
  updateCurrentPage({ state, commit, dispatch }, id) {
    const allRoutes = generateRoutes()

    if (state.activeId !== id && allRoutes.includes(id)) {
      commit('SET_ACTIVE_ID', id)
    }

    dispatch('updateLoadedSlides', id)
  },
}
