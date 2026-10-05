/**
 * Generates the logo PNG, favicons and OG image from the supplied
 * Skyline Webx mark (scripts/skylinewebx-logo-source.jpg). Resizes only —
 * the mark itself is not altered.  Run: node scripts/make-brand-assets.cjs
 */
const Jimp = require('jimp')
const path = require('path')
const root = path.join(__dirname, '..')
const src = path.join(__dirname, 'skylinewebx-logo-source.jpg')

;(async () => {
  const logo = await Jimp.read(src)
  const blue = logo.getPixelColor(8, 8) // background of the mark
  await logo.clone().resize(256, 256, Jimp.RESIZE_BICUBIC).writeAsync(path.join(root, 'src/assets/logo/skylinewebx-logo.png'))
  await logo.clone().resize(32, 32, Jimp.RESIZE_BICUBIC).writeAsync(path.join(root, 'public/favicon-32.png'))
  await logo.clone().resize(192, 192, Jimp.RESIZE_BICUBIC).writeAsync(path.join(root, 'public/favicon-192.png'))
  await logo.clone().resize(180, 180, Jimp.RESIZE_BICUBIC).writeAsync(path.join(root, 'public/apple-touch-icon.png'))
  // OG image: the mark centred on its own blue field.
  const og = new Jimp(1200, 630, blue)
  og.composite(logo.clone().resize(460, 460, Jimp.RESIZE_BICUBIC), 370, 85)
  og.quality(88)
  await og.writeAsync(path.join(root, 'public/og-image.jpg'))
  console.log('brand assets written')
})()
