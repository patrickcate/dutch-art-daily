describe('details slide', () => {
  beforeEach(() => {
    cy.visit('/01-01')
  })

  it('details slide should be 2 columns at wider screen sizes', () => {
    let titleLeft = cy.$$(
      '.l-page__details .swiper-slide-active .details-slide__title'
    )[0].offsetLeft

    let listLeft = cy.$$(
      '.l-page__details .swiper-slide-active .details-list'
    )[0].offsetLeft

    expect(titleLeft).not.to.eq(listLeft)

    cy.viewport('iphone-6')
    cy.visit('/01-01')

    cy.wait(1).then(() => {
      titleLeft = cy.$$(
        '.l-page__details .swiper-slide-active .details-slide__title'
      )[0].offsetLeft

      listLeft = cy.$$('.l-page__details .swiper-slide-active .details-list')[0]
        .offsetLeft

      expect(titleLeft).to.eq(listLeft)
    })
  })
})
