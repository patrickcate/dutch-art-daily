import { dateId } from '@utils/format-date.js'

/**
 * Redirect plugin to redirect users on page load to the current date page.
 * @param {*} param
 */

export default function({ redirect }, inject) {
  function homepageRedirect() {
    const today = dateId(new Date())
    redirect(`/${today}`)
  }

  inject('homepageRedirect', homepageRedirect)
}
