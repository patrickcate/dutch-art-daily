module.exports = async function(filePath, photoData) {
  const path = require('path')
  const Jimp = require('jimp')

  const imageWidths = {
    xs3: 640,
    xs2: 800,
    xs: 960,
    sm: 1120,
    md: 1280,
    lg: 1440,
    xl: 1600,
    xl2: 1760,
    xl3: 1920,
  }

  const imageSizes = Object.keys(imageWidths)
  const length = imageSizes.length

  // Build the directory path we want to store our resized images in.
  const photoOutputDirectory = path.join(__dirname, '../static/photos/')

  const imageSizeData = {}

  for (let i = 0; i < length; ) {
    const size = imageSizes[i]
    const width = imageWidths[size]

    if (photoData.width >= width) {
      await Jimp.read(filePath)
        .then(async image => {
          // Clone the image so we are always working with a copy.
          const photo = image.clone()

          photo
            .resize(width, Jimp.AUTO, Jimp.RESIZE_BEZIER) // Resize
            .quality(85) // JPEG quality

          imageSizeData[size] = await {
            width: photo.bitmap.width,
            height: photo.bitmap.height,
          }

          const imageUrl = `${photoOutputDirectory}${photoData.id}/${photoData.id}--${size}-${photoData.hash}.jpg`

          // Save image jpg.
          photo.write(imageUrl)

          return imageSizeData
        })
        .catch(err => {
          console.error(err)
        })
    }

    i++
  }

  return imageSizeData
}
