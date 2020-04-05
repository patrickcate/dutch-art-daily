import { dateId } from '../../../utils/format-date.js'

describe('the logo', () => {
  let todaysId

  beforeEach(() => {
    todaysId = dateId(new Date())
  })

  it('clicking on the logo redirects to todays page if not on it already', () => {
    cy.visit('/01-01')
    cy.get('a.home').click()

    cy.url().should('include', `/${todaysId}`)
  })

  it('clicking on the logo moves to todays slide if already on todays page', () => {
    cy.visit(`/${todaysId}`)

    cy.get('h1')
      .contains('Today')
      .should('have.length', 1)

    cy.get('.timeline-nav-button--prev').click()
    cy.get('h1')
      .contains('Yesterday')
      .should('have.length', 1)

    cy.get('a.home').click()
    cy.get('h1')
      .contains('Today')
      .should('have.length', 1)
  })

  it('shows the condensed version of logo at small screen widths', () => {
    cy.visit('/01-01')
    cy.get('svg.logo').should('be.visible')
    cy.get('svg.logo-sm').should('not.be.visible')

    cy.viewport('iphone-6')
    cy.visit('/01-01')

    cy.get('svg.logo').should('not.be.visible')
    cy.get('svg.logo-sm').should('be.visible')
  })
})
