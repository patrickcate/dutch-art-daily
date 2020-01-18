module.exports.generatePhotoData = function() {
  const fs = require('fs')
  const path = require('path')
  const Jimp = require('jimp')
  const Vibrant = require('node-vibrant')
  const readData = require('read-data')
  const writeData = require('write-data')
  const generateImageSizes = require('./generate-image-sizes')

  // Build the directory name we want to scan.
  const photosSrcDirectory = path.join(__dirname, '../_source/photos/')

  // Get an array of all files in the directory.
  const files = fs
    .readdirSync(photosSrcDirectory)
    .filter(path => path.indexOf('.jpg') !== -1)

  const dataSrcDirectory = path.join(__dirname, '../_source/data/')
  const dataDestDirectory = path.join(__dirname, '../data/')

  // Get the total number of files in the directory.
  const length = files.length

  ;(async () => {
    for (let i = 0; i < length; ) {
      const file = files[i]
      const fileId = file.replace('.jpg', '')
      const date = fileId.split('-')
      console.log('READ', fileId)

      // Build the full path to the file.
      const filePath = path.join(photosSrcDirectory, file)

      let photoData = readData.sync(
        `${dataSrcDirectory}${date[0]}/${fileId}.yml`
      )

      // Calculate the artwork's orientation.
      photoData.orientation =
        photoData.art_width > photoData.art_height ? 'landscape' : 'portrait'

      await Vibrant.from(filePath)
        .getPalette()
        .then(async palette => {
          photoData.vibrant = palette.Vibrant ? palette.Vibrant.getHex() : null
          photoData.lightVibrant = palette.LightVibrant
            ? palette.LightVibrant.getHex()
            : null
          photoData.darkVibrant = palette.DarkVibrant
            ? palette.DarkVibrant.getHex()
            : null
          photoData.muted = palette.Muted ? palette.Muted.getHex() : null
          photoData.lightMuted = palette.LightMuted
            ? palette.LightMuted.getHex()
            : null
          photoData.darkMuted = palette.DarkMuted
            ? palette.DarkMuted.getHex()
            : null

          await Jimp.read(filePath).then(async image => {
            photoData.width = image.bitmap.width
            photoData.height = image.bitmap.height
            photoData.ratio = Number.parseFloat(
              (image.bitmap.height / image.bitmap.width).toFixed(6)
            )

            photoData.hash = image.hash()

            const imagesSizes = await generateImageSizes(filePath, photoData)

            photoData = await {
              ...imagesSizes,
              ...photoData,
            }

            // Save the photo data to .json files so they can be imported later.
            await writeData.sync(
              `${dataDestDirectory}${date[0]}/${fileId}.json`,
              photoData
            )

            console.log('WRITE', fileId)
          })
        })
        .catch(err => {
          console.error(err)
        })

      i++
    }
  })()
}
