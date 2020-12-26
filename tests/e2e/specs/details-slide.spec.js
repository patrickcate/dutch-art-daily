describe('details slide', () => {
  beforeEach(() => {
    cy.visit('/01-01')
  })

  it('details slide should be 2 columns at wider screen sizes', () => {
    const detailsTitleSelector =
      '.l-page__details .swiper-slide-active .details-slide__title'
    const detailsListSelector =
      '.l-page__details .swiper-slide-active .details-list'
    let titleLeft
    let listLeft

    cy.get(detailsTitleSelector)
      .should('be.visible')
      .get(detailsListSelector)
      .should('be.visible')
      .then(() => {
        titleLeft = cy.$$(detailsTitleSelector)[0].offsetLeft
        listLeft = cy.$$(detailsListSelector)[0].offsetLeft

        expect(titleLeft).not.to.eq(listLeft)
      })

    cy.viewport('iphone-6')
    cy.visit('/01-01')

    cy.get(detailsTitleSelector)
      .should('be.visible')
      .get(detailsListSelector)
      .should('be.visible')
      .then(() => {
        titleLeft = cy.$$(detailsTitleSelector)[0].offsetLeft
        listLeft = cy.$$(detailsListSelector)[0].offsetLeft
        expect(titleLeft).to.eq(listLeft)
      })
  })
})
