import { fetchArtworkData } from '@utils/fetch-artwork-data'
import { dateId } from '@utils/format-date.js'
/**
 * Redirect plugin to redirect users on page load to the current date page.
 * @param {*} param
 */

export default function({ store, redirect }, inject) {
  async function homepageRedirect() {
    const today = dateId(new Date())

    if (store.state.currentPage !== today) {
      const slides = await fetchArtworkData(today)

      await store.dispatch('setSlideData', slides)

      store.commit('SET_CURRENT_PAGE', today)

      redirect(`/${today}`)
    }
  }

  inject('homepageRedirect', homepageRedirect)
}
