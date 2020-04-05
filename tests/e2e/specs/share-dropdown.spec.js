describe('share dropdown', () => {
  beforeEach(() => {
    cy.visit('/01-01')
  })

  it('share dropdown displays on small screen widths', () => {
    cy.viewport('macbook-13')
    cy.get('.share-list--horizontal').should('be.visible')
    cy.get('.share-dropdown').should('not.be.visible')

    cy.viewport('iphone-6+')
    cy.get('.share-list--horizontal').should('not.be.visible')
    cy.get('.share-dropdown').should('be.visible')
  })

  it('share dropdown toggles on click', () => {
    cy.viewport('iphone-6+')
    cy.get('.share-dropdown__button')
      .find('.share-list__icon')
      .should('not.be.visible')
    cy.get('.share-dropdown__button').should('be.visible')

    cy.get('.share-dropdown__button').click()

    cy.get('.share-dropdown__button').should(
      'have.attr',
      'aria-expanded',
      'true'
    )
    cy.get('.share-dropdown__list')
      .find('.share-list__icon')
      .should('be.visible')
    cy.get('.share-dropdown__button').click()

    cy.get('.share-dropdown__button').should('not.have.attr', 'aria-expanded')
    cy.get('.share-dropdown__button')
      .find('.share-list__icon')
      .should('not.be.visible')
  })
})
