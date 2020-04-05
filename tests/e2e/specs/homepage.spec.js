import subDays from 'date-fns/subDays'
import { dateId, formatDate } from '../../../utils/format-date.js'

describe('the homepage', () => {
  let todaysId
  let todaysMonth
  let todaysDay

  let yesterdaysId
  let yesterdaysMonth
  let yesterdaysDay

  beforeEach(() => {
    todaysId = dateId(new Date())
    todaysMonth = formatDate(todaysId, 'month')
    todaysDay = formatDate(todaysId, 'day')

    yesterdaysId = dateId(subDays(new Date(), 1))
    yesterdaysMonth = formatDate(yesterdaysId, 'month')
    yesterdaysDay = formatDate(yesterdaysId, 'day')
  })

  it('visits the home and redirects to todays artwork page', () => {
    cy.visit('/')
    cy.url().should('include', `/${todaysId}`)
    cy.get('h1')
      .contains(`Today, ${todaysMonth} ${todaysDay}`)
      .should('have.length', 1)

    cy.get('.timeline-nav-button--prev').click()
    cy.get('h1')
      .contains(`Yesterday, ${yesterdaysMonth} ${yesterdaysDay}`)
      .should('have.length', 1)
  })
})

// Test that share metadata changes.
// Test that head metadata changes.
// Setup mock data.
