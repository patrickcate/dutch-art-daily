import { generateDateList } from './format-date'

export async function fetchArtworkData(id) {
  const slideDates = generateDateList(id)

  const slides = await Promise.all(
    slideDates.map(async item => {
      // Break the date parameters into an array so we can access the month
      // and day separately.
      const date = item.split('-')

      // Use the function form of import to dynamically parse the .json content
      // files.
      const artwork = await import(
        `../data/${date[0]}/${date[0]}-${date[1]}.json`
      )

      return artwork.default
    })
  )

  return slides
}
