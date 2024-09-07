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

// Example usage
// amazonScraper("https://www.amazon.in/Emerald-Portrait-SUPERVOOC-Additional-Exchange/dp/B0DCGH5H2T/ref=sr_1_5?adgrpid=160905906446&dib=eyJ2IjoiMSJ9.9gWoEbyPtuM-l9n9t2exXQLhKy1ALJruWuqSwuUe5TzqtNDrZJWCqAnxEMyJrYYldhjS_HRNQb-tYSZlVgGpwzU3XnYrlk-dYS9cJphmh5Zzphwtn-pZUwPGpZDQBzVN87Ob1fikib4OuNdU2EDXZAZf4F6ySEVn1wOXiotp_yCr4lXt5Nxmjjesqi1MN4ngnsqC58mawaB9lBAk9YhqMylO_4jSaQicAr1WGtNiTxA.2owOz5ztGtMqRoGR3N0zFFryTkNZ1uW0GFHwzdsGWcM&dib_tag=se&gad_source=1&hvadid=699307216733&hvdev=c&hvlocphy=9302578&hvnetw=g&hvqmt=e&hvrand=8277124397383690011&hvtargid=kwd-2258561919586&hydadcr=24541_2265439&keywords=oppo+reno10+5g+amazon&nsdOptOutParam=true&qid=1725739138&sr=8-5");
