import { dateId, formatDate } from '../../../utils/format-date.js'
// import mockData from '../../fixtures/mock-data.js'

describe('the homepage', () => {
  let todaysId
  let todaysMonth
  let todaysDay

  beforeEach(() => {
    todaysId = dateId(new Date())
    todaysMonth = formatDate(todaysId, 'month')
    todaysDay = formatDate(todaysId, 'day')
  })

  it('visits the home and redirects to todays artwork page', () => {
    cy.visit('/')
    cy.url().should('include', `/${todaysId}`)
    cy.contains('h1', `Today, ${todaysMonth} ${todaysDay}`)
  })

  it('can use the nav buttons to cycle slides', () => {
    cy.visit('/01-01')
    cy.contains('h1', 'January 1')
    cy.contains('h2', 'The Milkmaid')
    cy.contains('.timeline-nav__list-item.swiper-slide-active', '01/01')
    cy.get('.timeline-nav-button--next').should('be.disabled')

    cy.get('.timeline-nav-button--prev').click()
    cy.contains('h1', 'December 31')
    cy.contains('h2', 'Girl with a Red Hat')
    cy.contains('.timeline-nav__list-item.swiper-slide-active', '12/31')
    cy.get('.timeline-nav-button--next').should('not.be.disabled')

    for (let step = 0; step < 5; step++) {
      cy.get('.timeline-nav-button--prev').click()
    }

    cy.get('.timeline-nav-button--prev').should('be.disabled')
  })
})

// Test that pagination numbers display differently at different screen sizes
// Test that the slide height is updated.
// Test that the logo click redirect works.
// Test that clicking on timeline slide goes directly to correct slide.
// Test that swipe gestures work.
// Test that browser resizing updates slide heights.
// Test that head metadata changes.
// Test that yesterday label is displayed correctly.
// Test that date label is displayed correct in timeline and at different screen sizes.
// Setup mock data.
// Test that details switches from 1-2 columns at difference screen sizes.
