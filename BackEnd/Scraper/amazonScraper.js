const puppeteer = require('puppeteer');

const amazonScraper = (async (url) => {

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
        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
        });

        // const url = 'https://www.flipkart.com/search?q=mobile+phone'

        await page.goto(url,
            {
                waitUntil: "domcontentloaded",
                timeout: 0,
            }

        );



        const productDetails = await page.evaluate(async () => {

            const ProductName = await document.querySelector('#productTitle').innerText

            const rating = await document.querySelectorAll(".a-icon-alt")[0].innerHTML.slice(0, 3)

            const Discount_price = await (document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole") ? document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole").innerHTML : null);

            const ActualPrice = await document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span:nth-child(2)")
                ? document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span:nth-child(2)").innerHTML
                : Discount_price

            const detailskey = [];
            const detailsvalue = [];

            document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr:nth-child(1) > th") ? document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr > th").forEach(elem => {
                detailskey.push(elem.innerText)
            }) : "not found"

            document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr:nth-child(1) > td") ? document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr > td").forEach(elem => {
                detailsvalue.push(elem.innerText)
            }) : "nor found"


            const offerkey = [];
            if (await document.querySelectorAll('  span > h6')) {
                await document.querySelectorAll('  span > h6').forEach(elem => {
                    offerkey.push(elem.innerText);
                    // console.log(elem.innerText);
                })
            }
            const offerValue = [];
            if (await document.querySelectorAll('  span > h6')) {
                await document.querySelectorAll('  span > h6').forEach(elem => {
                    offerValue.push(elem.innerText);
                    // console.log(elem.innerText);
                })
            }


            let deatails_obj = {};
            detailskey.forEach((k, i) => { deatails_obj[k] = detailsvalue[i] })
            let Offer_obj = {};
            offerkey.forEach((k, i) => { Offer_obj[k] = offerValue[i] })

            let obj = await {
                title: ProductName,
                rating: rating,
                Discount_price: Discount_price,
                Actual_price: ActualPrice,
                Details: deatails_obj,
                offers: Offer_obj
            }

            return obj;
        });
        console.log(productDetails);
        browser.close();
        // console.log()
        return productDetails

    } catch (error) {
        console.log(error);
        console.log({
            Error: error.message
        })
    }



});

// amazonScraper("https://www.amazon.in/Oppo-Aurora-Storage-Medium-CPH2249/dp/B09B4VYY2V/ref=sr_1_1_sspa?keywords=best+mobile+under+20000&qid=1673379251&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&smid=A1XWWAZDGI9V7F")


module.exports = amazonScraper

