const puppeteer = require('puppeteer');
const flipkartUtils = require('./futils');

const flipkartScraper = async (url) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            // devtools: true,
            defaultViewport: {
                width: 1280,
                height: 1024,
            },
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 0,
        });

        const productDetails = await page.evaluate((utils) => {
            const ProductNameElement = document.querySelector(utils.title);
            const ProductName = ProductNameElement ? ProductNameElement.innerHTML : null;
            const refinedProductName = ProductName ? ProductName.replaceAll("<!-- -->&nbsp;&nbsp;", "") : "";

            const ratingElement = document.querySelector(utils.rating);
            const rating = ratingElement ? ratingElement.textContent.trim().slice(0, 3) : null;

            const DiscountPriceElement = document.querySelector('.Nx9bqj.CxhGGd.yKS4la');
            const DiscountPrice = DiscountPriceElement
                ? DiscountPriceElement.innerText.replaceAll(',', "").replaceAll('₹', "")
                : null;

            const ActualPriceElement = document.querySelector('.yRaY8j.A6\\+E6v.yKS4la');
            const ActualPrice = ActualPriceElement
                ? ActualPriceElement.innerText.replaceAll(',', "").replaceAll('₹', "")
                : null;

            const details = [];
            document.querySelectorAll(utils.details_value).forEach(elem => {
                details.push(elem.innerText);
            });

            const detailsKey = [];
            document.querySelectorAll(utils.details_key).forEach(elem => {
                detailsKey.push(elem.innerText);
            });

            const detailsObj = [detailsKey, details];

            const images = [];
            document.querySelectorAll(utils.image_selector).forEach(elem => {
                images.push(elem.src.replaceAll("128", "540"));
            });



            const offerKey = [];
            document.querySelectorAll(utils.offer_key).forEach(elem => {
                offerKey.push(elem.innerText);
            });

            const offerValue = [];
            document.querySelectorAll(utils.offer_value).forEach(elem => {
                offerValue.push(elem.innerText);
            });

            const offerObj = [offerKey, offerValue];

            return {
                title: refinedProductName,
                rating: parseFloat(rating),
                Discount_price: parseInt(DiscountPrice, 10),
                Actual_price: parseInt(ActualPrice, 10),
                Details: detailsObj,
                offers: offerObj,
                image: images
            };
        }, flipkartUtils);

        console.log(productDetails);
        await browser.close();
        return productDetails;

    } catch (error) {
        console.log({
            "Error at fs": error.message,
            errorLocation: error.stack
        });
    }
};

module.exports = flipkartScraper;