import isToday from 'date-fns/is_today'
import isYesterday from 'date-fns/is_yesterday'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'

/**
 * Returns the date ordinal string base on the numeric day of the month.
 * @param {Number} day
 */
export function getDateOrdinal(day) {
  if (day === 1 || day === 21 || day === 31) return 'st'
  if (day === 2 || day === 22) return 'nd'
  if (day === 3 || day === 23) return 'rd'
  return 'th'
}

/**
 * Takes a ISO 8601 formatted date string and formats it in the correct format
 * for display as the page date title.
 * @param {String} ISODate
 */
export function formatDate(id, part) {
  // Parse the ISO 8601 string into an actual Date object.
  const date = new Date(getISODate(id))

  // Setup date formatting options.
  // @see https://mzl.la/1TepFRT
  const options = {}
  if (part === 'month') {
    options.month = 'long'
  } else if (part === 'day') {
    options.day = 'numeric'
  } else {
    options.month = 'long'
    options.day = 'numeric'
  }

  // Format the date with the optional prefix.
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function getISODate(id) {
  // Convert a artwork date id to an ISO date string.
  return getDateObjFromId(id).toISOString()
}

export function getDateObjFromId(id) {
  // Break the data parameters into an array so we can access the month
  // and day separately.
  const date = id.split('-')
  const year = new Date().getFullYear()
  const dateObject = new Date(year, date[0] - 1, date[1])

  return dateObject
}

/**
 * Takes a JavaScript date object and converts it to a string that
 * matches a date id.
 * @param { Date } dateObj
 */
export function dateId(dateObj) {
  // Get the month for the previous day. We need to add 1 since months are
  // 0 based. Also, we pad months < 10 with a 0.
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0')

  // Get the day of the month for the previous day.
  // Also, we pad months < 10 with a 0.
  const day = `${dateObj.getDate()}`.padStart(2, '0')

  // Return the month and day as a URL string.
  return `${month}-${day}`
}

export function dateShort(dateObj) {
  return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`
}

export function yesterdayDateId(dateObj) {
  return dateId(subDays(dateObj, 1))
}

export function tomorrowDateId(dateObj) {
  return dateId(addDays(dateObj, 1))
}

export function dateArray(dateId) {
  return dateId.split('-')
}

export function dateObject(dateId) {
  const parts = dateArray(dateId)

  return {
    month: parts[0],
    day: parts[1],
  }
}

export function getDateLabel(id) {
  const isoDate = getISODate(id)

  // Check if the date matches today's date.
  if (isToday(isoDate)) {
    return 'Today'
  }
  // Check if the date matches yesterdays's date.
  else if (isYesterday(isoDate)) {
    return 'Yesterday'
  }

  return ''
}

export function generateDateList(id) {
  const today = getDateObjFromId(id)
  const dateList = [id]

  for (let i = 1; i < 7; i++) {
    dateList.push(dateId(subDays(today, i)))
  }

  return dateList.reverse()
}
