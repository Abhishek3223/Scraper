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

            const Discount_price = await (document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole") ? (document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole").innerHTML).replace(',', "") : null);

            console.log(Discount_price);
            const ActualPrice = await document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span.a-offscreen")
                ? (document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span.a-offscreen").innerText).replace(',',"").replace('₹',"")
                : Discount_price

            const detailskey = [];
            const detailsvalue = [];

            document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr:nth-child(1) > th") ? document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr > th").forEach(elem => {
                detailskey.push(elem.innerHTML)
            }) : "not found"

            document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr:nth-child(1) > td") ? document.querySelectorAll("#productDetails_techSpec_section_1 > tbody > tr > td").forEach(elem => {
                detailsvalue.push(elem.innerHTML)
            }) : "not found"

            const image = []
            document.querySelectorAll(" span>input+span> img") ?
                document.querySelectorAll(" span>input+span> img").forEach(elem => {
                    image.push(elem.src)
                }) : "nor found"

            const offerkey = [];
            if (await document.querySelectorAll('  span > h6')) {
                await document.querySelectorAll('  span > h6').forEach(async elem => {
                    const v = await (elem.innerHTML);
                    offerkey.push(v);
                })
            }
            const offerValue = [];
            (document.querySelectorAll('span.a-truncate-full.a-offscreen')) ?
                document.querySelectorAll(' span.a-truncate-full.a-offscreen').forEach(async elem => {
                    const v = await (elem.innerText);

                    offerValue.push(v);
                    // console.log(elem.innerText);
                }) : ""



            const deatails_obj = [detailskey, detailsvalue]
            const Offer_obj = [JSON.stringify(offerkey), JSON.stringify(offerValue)];

            let obj = {
                title: ProductName,
                rating: rating,
                Discount_price: parseInt(Discount_price),
                Actual_price:  parseInt(ActualPrice),
                Details: deatails_obj,
                offers: Offer_obj,
                image: image
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
            "Error at az": error.message
        })
    }



});

// amazonScraper("https://www.amazon.in/Oppo-Aurora-Storage-Medium-CPH2249/dp/B09B4VYY2V/ref=sr_1_1_sspa?keywords=best+mobile+under+20000&qid=1673379251&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&smid=A1XWWAZDGI9V7F")


module.exports = amazonScraper

