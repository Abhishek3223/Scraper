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

            const ProductName = document.querySelector('.B_NuCI') ? document.querySelector('.B_NuCI').innerHTML : null;
            const refinedProductName = ProductName.replace("<!-- -->&nbsp;&nbsp;", "");

            const rating = document.querySelector('._3LWZlK') ? document.querySelector('._3LWZlK').innerHTML.slice(0, 3) : null;

            const Discount_price = document.querySelector('._30jeq3._16Jk6d') ? document.querySelector('._30jeq3._16Jk6d').innerHTML : null;

            const price = document.querySelector('._3I9_wc._2p6lqe') ? (document.querySelector('._3I9_wc._2p6lqe').innerHTML).slice(9, (document.querySelector('._3I9_wc._2p6lqe').innerHTML).length) : Discount_price

            const details = [];
            document.querySelectorAll('._21Ahn-').forEach(elem => {
                details.push(elem.innerHTML)
            });

            const detailskey = [];
            const detailsvalue = [];
            document.querySelectorAll(" div._1UhVsV > div> table > tbody > tr") ? document.querySelectorAll(" div._1UhVsV > div> table > tbody > tr> td._1hKmbr.col.col-3-12").forEach(elem => {
                detailsvalue.push(elem.innerText)
            }) : "not found"

            document.querySelectorAll("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div._1YokD2._3Mn1Gg > div:nth-child(4) > div > div> div._1UhVsV > div > table > tbody > tr > td._1hKmbr.col.col-3-12") ?
                document.querySelectorAll("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div._1YokD2._3Mn1Gg > div:nth-child(4) > div > div> div._1UhVsV > div > table > tbody > tr > td._1hKmbr.col.col-3-12").forEach(elem => {
                    detailskey.push(elem.innerText)
                }) : "nor found"


            let deatails_obj = {};
            detailskey.forEach((k, i) => { deatails_obj[k] = detailsvalue[i] })


            const offerkey = [];
            if (await document.querySelectorAll('  div._3TT44I > div > div > span > li > span.u8dYXW')) {
                await document.querySelectorAll('  div._3TT44I > div > div > span > li > span.u8dYXW').forEach(elem => {
                    offerkey.push(elem.innerText);
                    // console.log(elem.innerText);
                })
            }
            const offerValue = [];
            if (await document.querySelectorAll('div._3TT44I > div > div > span > li > span:nth-child(2)')) {
                await document.querySelectorAll('div._3TT44I > div > div > span > li > span:nth-child(2)').forEach(elem => {
                    offerValue.push(elem.innerText);
                    // console.log(elem.innerText);
                })
            }
            let Offer_obj = Object.assign(...offerkey.map((k, i)=>({[k]: offerValue[i]}) ))
            // offerkey.forEach((k, i) => { Offer_obj[k] = offerValue[i] })

            let obj = {
                title: refinedProductName,
                rating: rating,
                Discount_price: Discount_price,
                Actual_price: price,
                Details: deatails_obj,
                offers: Offer_obj
            }

            return obj;
        });
        // console.log(productDetails);
        browser.close();
        return productDetails

    } catch (error) {

        console.log({
            Error: error.message
        })
    }



});

// flipkartScraper("https://www.flipkart.com/oneplus-10-pro-5g-emerald-forest-256-gb/p/itmcd1af0daf0394")



module.exports = flipkartScraper



