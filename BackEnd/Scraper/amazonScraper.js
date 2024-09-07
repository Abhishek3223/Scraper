const puppeteer = require('puppeteer');
const amazonUtils = require('./amazonUtils'); // You need to define this similar to futils for Amazon selectors

const amazonScraper = async (url) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {
                width: 1280,
                height: 1024,
            },
        });

        const page = await browser.newPage();

        // Go to the Amazon product page
        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 0,
        });

        const productDetails = await page.evaluate((utils) => {
            const productNameElement = document.querySelector(utils.title);
            const productName = productNameElement ? productNameElement.textContent.trim() : null;

            const ratingElement = document.querySelector('a > span.a-size-base.a-color-base');
            const rating = ratingElement ? ratingElement.textContent.trim() : null;

            const discountPriceElement = document.querySelector(utils.discount_price);
            const discountPrice = discountPriceElement
                ? discountPriceElement.innerText.replaceAll(',', "").replaceAll('₹', "").replaceAll('$', "")
                : null;

            const actualPriceElement = document.querySelector(utils.actual_price);
            const actualPrice = actualPriceElement
                ? parseInt(actualPriceElement.innerText.replace(/[₹,]/g, ""), 10)
                : null;

            const keys = [];
            const values = [];

            // Iterate through each row in the tbody
            document.querySelectorAll('tbody tr').forEach(row => {
                const keyElem = row.querySelector('th');
                const valueElem = row.querySelector('td');

                if (keyElem && valueElem) {
                    const key = keyElem.innerText.trim();
                    const value = valueElem.innerText.trim();
                    keys.push(key);
                    values.push(value);
                }
            });
            const detailsObj = [keys, values];
            function convertImageUrl(url) {
                // Split the URL at the base path and the parameters
                const [basePath, params] = url.split('.jpg')[0].split(/(?<=\/images\/I\/[^\/]+)\./);

                // Construct the new URL by appending '.jpg' to the base path
                const newUrl = `${basePath}.jpg`;

                return newUrl;
            }

            const images = [];
            document.querySelectorAll('ul.a-unordered-list img').forEach(img => {
                const src = img.src;
                if (src) {
                    // Adjust image size in the URL if necessary
                    const adjustedSrc = src.replace(/SX38_SY50_CR,0,0,38,50/, 'SX540_SY540_QL65');
                    images.push(adjustedSrc);
                }
            });


            const offerKey = [];
            document.querySelectorAll(utils.offer_key).forEach(elem => {
                offerKey.push(elem.innerText);
            });

            const offerValue = [];
            document.querySelectorAll("div.offers-items-content span.a-truncate-full.a-offscreen").forEach(elem => {
                offerValue.push(elem);
            });

            const offerObj = [offerKey, offerValue];

            return {
                title: productName,
                rating: parseFloat(rating),
                Discount_price: parseInt(discountPrice, 10),
                Actual_price: actualPrice,
                Details: detailsObj,
                offers: offerObj,
                image: images
            };
        }, amazonUtils);

        console.log(productDetails);
        await browser.close();
        return productDetails;

    } catch (error) {
        console.log({
            "Error at Amazon Scraper": error.message,
            errorLocation: error.stack
        });
    }
};

module.exports = amazonScraper;
