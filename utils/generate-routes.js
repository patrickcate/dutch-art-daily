export function generateRoutes() {
  const dates = [
    {
      month: 1,
      days: 31,
    },
    {
      month: 2,
      days: 29,
    },
    {
      month: 3,
      days: 31,
    },
    {
      month: 4,
      days: 30,
    },
    {
      month: 5,
      days: 31,
    },
    {
      month: 6,
      days: 30,
    },
    {
      month: 7,
      days: 31,
    },
    {
      month: 8,
      days: 31,
    },
    {
      month: 9,
      days: 30,
    },
    {
      month: 10,
      days: 31,
    },
    {
      month: 11,
      days: 30,
    },
    {
      month: 12,
      days: 31,
    },
  ]

  const routes = dates.reduce((accumulator, item) => {
    // Get the month formatted as MM.
    const month = `${item.month}`.padStart(2, '0')

    // Loop through the max number of days in the month and return a string
    // in the format MM-DD so they can be used as the route names.
    for (let i = 1; i <= item.days; i++) {
      // Convert the day number to a DD formatted string.
      const day = `${i}`.padStart(2, '0')

      accumulator.push(`${month}-${day}`)
    }

    return accumulator
  }, [])

  return routes
}
