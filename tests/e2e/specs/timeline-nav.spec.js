describe('timeline nav', () => {
  it('correct number of timeline segments show at larger screen widths', () => {
    cy.viewport('macbook-13')
    cy.visit('/01-01')

    const clicks = [3, 4, 5, 5, 5, 4, 3]

    clicks.forEach((number, index) => {
      cy.get('.line-segment__point:visible').should('have.length', number)

      if (index < 6) {
        cy.get('.timeline-nav-button--prev').click()
      }
    })
  })

  it('correct number of timeline segments show at smaller screen widths', () => {
    cy.viewport('iphone-6')
    cy.visit('/01-01')

    const clicks = [2, 3, 3, 3, 3, 3, 2]

    clicks.forEach((number, index) => {
      cy.get('.timeline-nav__list-item .line-segment__point:visible').should(
        'have.length',
        number
      )

      if (index < 6) {
        cy.get('.timeline-nav-button--prev').click()
      }
    })
  })

  it('the timeline shows the today and yesterday labels at larger screen sizes', () => {
    cy.visit('/')

    cy.get('.timeline-nav__list-item.swiper-slide-active').should(
      'contain',
      'Today'
    )

    cy.get('.timeline-nav__list-item.swiper-slide-active')
      .prev()
      .should('contain', 'Yesterday')
  })

  it('the timeline does not show the today and yesterday labels at smaller screen sizes', () => {
    cy.viewport('iphone-6')
    cy.visit('/')

    cy.get('.timeline-nav__list-item.swiper-slide-active').should(
      'not.contain',
      'Today'
    )

    cy.get('.timeline-nav__list-item.swiper-slide-active')
      .prev()
      .should('not.contain', 'Yesterday')
  })

  it('clicking on a timeline segment goes to that slide', () => {
    cy.visit('/01-01')

    cy.get('.timeline-nav__list-item.swiper-slide-active').should(
      'contain',
      '01/01'
    )

    cy.get('.timeline-nav__list-item .line-segment:visible').first().click()

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    if (currentMonth === 11 && currentDay === 31) {
      cy.get('.timeline-nav__list-item.swiper-slide-active').should(
        'contain',
        'Yesterday'
      )
    } else {
      cy.get('.timeline-nav__list-item.swiper-slide-active').should(
        'contain',
        '12/30'
      )
    }

    cy.get('.timeline-nav__list-item.swiper-slide-active')
      .next()
      .find('.line-segment')
      .click()

    if (currentMonth === 11 && currentDay === 31) {
      cy.get('.timeline-nav__list-item.swiper-slide-active').should(
        'contain',
        'Today'
      )
    } else {
      cy.get('.timeline-nav__list-item.swiper-slide-active').should(
        'contain',
        '12/31'
      )
    }
  })

  it('can use the nav buttons to cycle slides', () => {
    cy.visit('/01-01')

    cy.get('.timeline-nav-button--next').should('be.disabled')

    cy.get('.timeline-nav-button--prev').click()

    cy.get('.timeline-nav-button--next').should('not.be.disabled')

    // Go to beginning of slides.
    for (let step = 0; step < 5; step++) {
      cy.get('.timeline-nav-button--prev').click()
    }

    cy.get('.timeline-nav-button--prev').should('be.disabled')
  })
})
