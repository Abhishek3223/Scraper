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

            const rating = document.querySelectorAll(".a-icon-alt")[0].innerHTML.slice(0, 3)

            const Discount_price = await (document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole") ? (document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole").innerHTML).replaceAll(',', "") : null);

            // console.log(Discount_price);
            const ActualPrice = await document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span.a-offscreen")
                ? (document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-small.aok-align-center > span > span.a-size-small.a-color-secondary.aok-align-center.basisPrice > span > span.a-offscreen").innerText).replaceAll(',', "").replaceAll('₹', "")
                : Discount_price

            const detailskey = [];
            const detailsvalue = [];

            document.querySelectorAll("#tech > div:nth-child(3) > div > div:nth-child(1) > div > table > tbody > tr > td > p > strong") ? document.querySelectorAll("#tech > div:nth-child(3) > div > div:nth-child(1) > div > table > tbody > tr > td > p > strong").forEach(elem => {
                detailskey.push(elem.innerHTML)
            }) : "not found"

            document.querySelectorAll("#tech > div:nth-child(3) > div > div:nth-child(1) > div > table > tbody > tr > td:nth-child(2) > p") ?
                document.querySelectorAll("#tech > div:nth-child(3) > div > div:nth-child(1) > div > table > tbody > tr > td:nth-child(2) > p").forEach(elem => {
                    detailsvalue.push(elem.innerHTML)
                }) : "not found"


            // gettinng image -------
            const image = []
            // document.querySelectorAll("#landingImage") ?
            // image.push(document.querySelectorAll("#landingImage").src) : ""
            document.querySelectorAll(" span>input+span> img") ?
                document.querySelectorAll(" span>input+span> img").forEach((elem, i) => {

                    if (i) {
                        image.push(elem.src.replaceAll("SX38_SY50", "SX540_SY540").replaceAll("0,0,38,50", "0,0,540,540"))
                    }

                }) : "nor found"

            const offerkey = [];
            if (await document.querySelectorAll('  span > h6')) {
                await document.querySelectorAll('  span > h6').forEach(async elem => {
                    const v = await (elem.innerHTML);
                    offerkey.push(v);
                })
            }
            const offerValue = [];
            // span > div > span > span.a-truncate-cut
            (document.querySelectorAll(' span > div > span > span.a-truncate-full.a-offscreen')) ?
                document.querySelectorAll('   span > div > span > span.a-truncate-full.a-offscreen').forEach(async elem => {
                    const v = (elem.innerText);

                    offerValue.push(v);
                    // console.log(elem.innerText);
                }) : ""



            const deatails_obj = [detailskey, detailsvalue]
            const Offer_obj = [offerkey, offerValue];

            let obj = {
                title: ProductName,
                rating: rating,
                Discount_price: parseInt(Discount_price),
                Actual_price: parseInt(ActualPrice),
                Details: deatails_obj,
                offers: Offer_obj,
                image: image
            }

            return obj;
        });
        // console.log(productDetails);
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

// amazonScraper("https://www.amazon.in/Apple-iPhone-14-128GB-Starlight/dp/B0BDK8LKPJ?th=1")
// amazonScraper("https://www.amazon.in/Oppo-Aurora-Storage-Medium-CPH2249/dp/B09B4VYY2V/ref=sr_1_1_sspa?keywords=best+mobile+under+20000&qid=1673379251&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&smid=A1XWWAZDGI9V7F")


module.exports = amazonScraper

