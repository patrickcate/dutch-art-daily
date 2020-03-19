import { generateRoutes } from '@utils/generate-routes'

describe('Generate routes', () => {
  it('has all dates', () => {
    const routes = generateRoutes()

    expect(routes.length).toBe(366)
  })
})
