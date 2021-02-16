import puppeteer from 'puppeteer'

//helper functions
function removeFirstCharacter(str) {
  return (str = parseInt(
    str.substring(1).replace(/[,U]/g, '').replace(/[SD]/g, ''),
    10
  ))
}

function splitOnUpperCase(str) {
  return (str = str.split(/(?=[A-Z])/))
}

//get the info from one art item:
async function scrapeProduct(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [elImg] = await page.$x(
    '//*[@id="__next"]/div/div/div[1]/div[1]/div/div[1]/div[1]/img'
  )
  const srcImg = await elImg.getProperty('src')
  const image = await srcImg.jsonValue()

  const [elName] = await page.$x(
    '//*[@id="__next"]/div/div/div[1]/div[2]/div/div[1]'
  )
  const txtName = await elName.getProperty('textContent')
  const name = await txtName.jsonValue()

  const [elBrand] = await page.$x(
    '//*[@id="__next"]/div/div/div[1]/div[2]/div/p[1]/a'
  )
  const txtBrand = await elBrand.getProperty('textContent')
  const brand = await txtBrand.jsonValue()

  const [elCountry] = await page.$x(
    '//*[@id="__next"]/div/div/div[1]/div[2]/div/p[2]'
  )
  const txtCountry = await elCountry.getProperty('textContent')
  const country = await txtCountry.jsonValue()

  const [elCategory] = await page.$x(
    '//*[@id="__next"]/div/div/div[1]/div[2]/div/p[3]'
  )
  const txtCategory = await elCategory.getProperty('textContent')
  const category = await txtCategory.jsonValue()

  const [elPrice] = await page.$x(
    '//*[@id="__next"]/div/div/div[1]/div[2]/div/div[3]/div[1]/div'
  )
  const txtPrice = await elPrice.getProperty('textContent')
  const rawPrice = await txtPrice.jsonValue()
  const price = removeFirstCharacter(rawPrice)

  const [elDescription] = await page.$x('//*[@id="__next"]/div/div/div[3]/p[2]')
  const txtDescription = await elDescription.getProperty('textContent')
  const description = await txtDescription.jsonValue()

  const [elSubject] = await page.$x('/html/body/div[3]/div/div/div[3]/div[2]/a')
  const txtSubject = await elSubject.getProperty('textContent')
  const rawSubject = await txtSubject.jsonValue()
  const subject = splitOnUpperCase(rawSubject)

  const [elStyle] = await page.$x('//*[@id="__next"]/div/div/div[3]/div[3]/div')
  const txtStyle = await elStyle.getProperty('textContent')
  const rawStyle = await txtStyle.jsonValue()
  const style = splitOnUpperCase(rawStyle)

  const [elMedium] = await page.$x(
    '//*[@id="__next"]/div/div/div[3]/div[4]/div/a'
  )
  const txtMedium = await elMedium.getProperty('textContent')
  const rawMedium = await txtMedium.jsonValue()
  const medium = splitOnUpperCase(rawMedium)

  const artObject = {
    name,
    image,
    description,
    brand,
    country,
    category,
    price,
    subject,
    style,
    medium,
    countInStock: 1,
    rating: 1,
    numReviews: 1,
  }

  return artObject

  browser.close()
}

scrapeProduct(
  'https://www.saatchiart.com/art/Painting-English-Rose/1162/7730580/view'
)

export default scrapeProduct
