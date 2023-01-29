const puppeteer = require('puppeteer');




const flipkartScraper = (async (url) => {

    try {
        const browser = await puppeteer.launch({
            headless: true,
            devtools: true,

            defaultViewport: {
                width: 1280,
                height: 1024,
            },
        });

        const page = await browser.newPage();
        // await page.setExtraHTTPHeaders({
        //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
        // });

        // const url = 'https://www.flipkart.com/search?q=mobile+phone'

        await page.goto(url,
            {
                waitUntil: "domcontentloaded",
                timeout: 0,
            }

        );


        const productDetails = await page.evaluate(async () => {

            const ProductName = document.querySelector('.B_NuCI') ? document.querySelector('.B_NuCI').innerHTML : null;
            const refinedProductName = ProductName.replace("<!-- -->&nbsp;&nbsp;", "");

            const rating = document.querySelector('._3LWZlK') ? document.querySelector('._3LWZlK').innerHTML.slice(0, 3) : null;

            const Discount_price = document.querySelector('._30jeq3._16Jk6d') ? document.querySelector('._30jeq3._16Jk6d').innerHTML.replace(',', "").replace('₹', "") : null;

            const price = document.querySelector('._3I9_wc._2p6lqe') ? (document.querySelector('._3I9_wc._2p6lqe').innerHTML).slice(9, (document.querySelector('._3I9_wc._2p6lqe').innerHTML).length).replace(',', "").replace('₹', "") : Discount_price

            const details = [];
            document.querySelectorAll('._21Ahn-').forEach(elem => {
                details.push(elem.innerHTML)
            });

            const detailskey = [];
            const detailsvalue = [];

            document.querySelectorAll("tr:nth-child(1) > td.URwL2w.col.col-9-12 > ul > li") ? document.querySelectorAll(" tr:nth-child(1) > td.URwL2w.col.col-9-12 > ul > li").forEach(elem => {
                detailsvalue.push(elem.innerHTML)
            }) : "not found"

            document.querySelectorAll(" table > tbody > tr:nth-child(1) > td._1hKmbr.col.col-3-12") ?
                document.querySelectorAll("  table > tbody > tr:nth-child(1) > td._1hKmbr.col.col-3-12").forEach(elem => {
                    detailskey.push(elem.innerHTML)
                }) : "nor found"




            const deatails_obj = [detailskey, detailsvalue];
            const image = []
            document.querySelectorAll(" div._2mLllQ > ul > li > div > div > img") ?
                document.querySelectorAll(" div._2mLllQ > ul > li > div > div > img").forEach(elem => {
                    image.push(elem.src)
                }) : "nor found"


            const offerkey = [];
            (await document.querySelectorAll('  #container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div > div._3TT44I > div > div > span > li > span.u8dYXW')) ?
                document.querySelectorAll('  #container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div > div._3TT44I > div > div > span > li > span.u8dYXW').forEach(elem => {
                    offerkey.push(elem.innerText);
                    // console.log(elem.innerText);
                }) : ""

            const offerValue = [];
            (await document.querySelectorAll('div._3TT44I > div > div > span > li > span:nth-child(2)')) ?
                document.querySelectorAll('div._3TT44I > div > div > span > li > span:nth-child(2)').forEach(elem => {
                    offerValue.push(elem.innerText);
                    // console.log(elem.innerText);
                }) : ""

            const Offer_obj = [offerkey, offerValue];

            let obj = {
                title: refinedProductName,
                rating: rating,
                Discount_price: parseInt(Discount_price),
                Actual_price: parseInt(price),
                Details: deatails_obj,
                offers: Offer_obj,
                image: image
            }

            return obj;
        });
        console.log(productDetails);
        browser.close();
        return productDetails

    } catch (error) {

        console.log({
            "Error at fs": error.message
        })
    }



});

flipkartScraper("https://www.flipkart.com/oneplus-10-pro-5g-emerald-forest-256-gb/p/itmcd1af0daf0394")



module.exports = flipkartScraper



