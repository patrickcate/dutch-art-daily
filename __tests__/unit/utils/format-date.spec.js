import subDays from 'date-fns/subDays'
import {
  getDateOrdinal,
  dateObject,
  generateDateList,
  getISODate,
  formatDate,
  dateId,
  getDateLabel,
} from '@utils/format-date'

describe('Date formatters', () => {
  it('return correct ordinal string', () => {
    const testData = new Map([
      [1, 'st'],
      [21, 'st'],
      [31, 'st'],
      [2, 'nd'],
      [22, 'nd'],
      [3, 'rd'],
      [23, 'rd'],
      [4, 'th'],
      [14, 'th'],
      [24, 'th'],
    ])

    testData.forEach((ordinal, date) => {
      expect(getDateOrdinal(date)).toBe(ordinal)
    })
  })

  it('get date month and day as object', () => {
    const testData = new Map([
      [
        '01-01',
        {
          month: '01',
          day: '01',
        },
      ],
      [
        '09-10',
        {
          month: '09',
          day: '10',
        },
      ],
      [
        '11-11',
        {
          month: '11',
          day: '11',
        },
      ],
      [
        '12-31',
        {
          month: '12',
          day: '31',
        },
      ],
    ])

    testData.forEach((object, date) => {
      expect(dateObject(date).month).toBe(object.month)
      expect(dateObject(date).day).toBe(object.day)
    })
  })

  it('generate list of previous 6 days', () => {
    const testData = [
      '12-26',
      '12-27',
      '12-28',
      '12-29',
      '12-30',
      '12-31',
      '01-01',
    ]

    const dateList = generateDateList('01-01')

    dateList.forEach((date, index) => {
      expect(date).toBe(testData[index])
    })
  })

  it('convert id to ISO 8601 date string', () => {
    const currentYear = new Date().getFullYear()
    const testDate = `${currentYear}-01-01T05:00:00.000Z`
    const isoDate = getISODate('01-01')

    expect(isoDate).toBe(testDate)
  })

  it('format id into local date', () => {
    const id = '01-01'

    expect(formatDate(id, 'month')).toBe('January')
    expect(formatDate(id, 'day')).toBe('1')
    expect(formatDate(id)).toBe('January 1')
  })

  it('return correct date label', () => {
    const today = dateId(new Date())
    expect(getDateLabel(today)).toBe('Today')

    const yesterday = dateId(subDays(new Date(), 1))
    expect(getDateLabel(yesterday)).toBe('Yesterday')

    const otherDay = dateId(subDays(new Date(), 2))
    expect(getDateLabel(otherDay)).toBe('')
  })
})
