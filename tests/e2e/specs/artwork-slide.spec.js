describe('artwork slide', () => {
  const carouselSelector = '.l-page__carousel'

  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/01-01')
  })

  it('carousel height updates when active artwork height changes', () => {
    cy.get(carouselSelector).as('pageCarousel').should('be.visible')

    let currentHeight = cy.$$(carouselSelector)[0].style.height

    for (let step = 0; step < 6; step++) {
      cy.get('.timeline-nav-button--prev').click()

      cy.get('@pageCarousel')
        .should('be.visible')
        .should('not.have.css', 'height', `${currentHeight}px`)

      currentHeight = cy.$$(carouselSelector)[0].style.height
    }
  })

  it('carousel height is updated when screen is resized', () => {
    cy.get(carouselSelector).as('pageCarousel').should('be.visible')

    const currentHeight = cy.$$(carouselSelector)[0].style.height

    cy.viewport('macbook-15')

    cy.get('@pageCarousel')
      .should('be.visible')
      .should('not.have.css', 'height', `${currentHeight}px`)
  })

  it('swipe left gesture changes active slide', () => {
    const activeTimelineSlideSelector =
      '.timeline-nav__list-item.swiper-slide-active'

    cy.get(activeTimelineSlideSelector).should('contain', '01/01')

    // Simulate swiper right gesture.
    cy.get('.l-page__carousel')
      .as('pageCarousel')
      .should('be.visible')
      .trigger('pointerdown', { which: 1, force: true })
      .trigger('pointermove', 'right', { force: true })
      .trigger('pointerup', { force: true })

    cy.get(activeTimelineSlideSelector)
      .not('.swiper-slide-next')
      .should('contain', '12/31', {
        timeout: 4000,
      })

    // Simulate swiper left gesture.
    cy.get('@pageCarousel')
      .should('be.visible')
      .trigger('pointerdown', { which: 1, force: true })
      .trigger('pointermove', 'left', { force: true })
      .trigger('pointerup', { force: true })

    cy.get(activeTimelineSlideSelector).should('contain', '01/01')
  })
})
