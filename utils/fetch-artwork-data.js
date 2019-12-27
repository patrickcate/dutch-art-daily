import { generateDateList } from './format-date'

export async function fetchArtworkData(id) {
  const slideDates = generateDateList(id)

  const slides = await Promise.all(
    slideDates.map(async item => {
      // Break the date parameters into an array so we can access the month
      // and day separately.
      const date = item.split('-')

      // Use the function form of import to dynamically parse the .yml content
      // files and return them as json.
      const artwork = await import(
        `../data/${date[0]}/${date[0]}-${date[1]}.yml`
      )

      const palette = await import(
        `../data/photos/${date[0]}-${date[1]}.photo.yml`
      )

      return {
        ...artwork.default,
        orientation:
          artwork.default.art_width > artwork.default.art_height
            ? 'landscape'
            : 'portrait',
        ...palette.default,
      }
    })
  )

  return slides
}
