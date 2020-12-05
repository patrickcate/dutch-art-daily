describe('artwork slide', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/01-01')
  })

  it('carousel height updates when active artwork height changes', () => {
    const carouselSelector = '.l-page__carousel'

    cy.get(carouselSelector)
      .should('be.visible')
      .then(() => {
        let currentHeight = cy.$$(carouselSelector)[0].style.height

        for (let step = 0; step < 6; step++) {
          cy.get('.timeline-nav-button--prev').click()

          cy.wait(1000).then(() => {
            const newHeight = cy.$$(carouselSelector)[0].style.height

            expect(newHeight).to.not.eq(currentHeight)

            currentHeight = cy.$$(carouselSelector)[0].style.height
          })
        }
      })
  })

  it('carousel height is updated when screen is resized', () => {
    const carouselSelector = '.l-page__carousel'

    cy.get(carouselSelector)
      .should('be.visible')
      .then(() => {
        const currentHeight = cy.$$(carouselSelector)[0].style.height

        cy.viewport('macbook-15')

        cy.wait(1000).then(() => {
          const newHeight = cy.$$(carouselSelector)[0].style.height

          expect(newHeight).to.not.eq(currentHeight)
        })
      })
  })

  it('swipe left gesture changes active slide', () => {
    cy.get('.timeline-nav__list-item.swiper-slide-active').should(
      'contain',
      '01/01'
    )

    cy.wait(1000)

    // Simulate swiper right gesture.
    cy.get('.l-page__carousel')
      .should('be.visible')
      .trigger('pointerdown', { which: 1 })
      .trigger('pointermove', 'right')
      .trigger('pointerup', { force: true })

    cy.get('.timeline-nav__list-item.swiper-slide-active').should(
      'contain',
      '12/31'
    )

    cy.wait(1000)

    // Simulate swiper left gesture.
    cy.get('.l-page__carousel')
      .should('be.visible')
      .trigger('pointerdown', { which: 1 })
      .trigger('pointermove', 'left')
      .trigger('pointerup', { force: true })

    cy.get('.timeline-nav__list-item.swiper-slide-active').should(
      'contain',
      '01/01'
    )
  })
})
