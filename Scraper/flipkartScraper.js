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

        await page.goto(url,
            {
                waitUntil: "domcontentloaded",
                timeout: 0,
            }

        );


        const productDetails = await page.evaluate(async () => {

            const ProductName = document.querySelector('.B_NuCI') ? document.querySelector('.B_NuCI').innerHTML : null;
            const refinedProductName = ProductName.replaceAll("<!-- -->&nbsp;&nbsp;", "");

            const rating = document.querySelector('._3LWZlK') ? document.querySelector('._3LWZlK').innerHTML.slice(0, 3) : null;

            const Discount_price = document.querySelector('._30jeq3._16Jk6d') ? document.querySelector('._30jeq3._16Jk6d').innerText.replaceAll(',', "").replaceAll('₹', "") : "";

            const price = document.querySelector('._3I9_wc._2p6lqe') ? (document.querySelector('._3I9_wc._2p6lqe').innerHTML).slice(9, (document.querySelector('._3I9_wc._2p6lqe').innerHTML)?.length).replaceAll(',', "")?.replaceAll('₹', "") : Discount_price


            const details = [];
            document.querySelectorAll('._21Ahn-').forEach(elem => {
                details.push(elem.innerHTML)
            });


            // getting details--------------------
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

            // getting image----------------------
            const image = []
            document.querySelectorAll(" div._2mLllQ > ul > li > div > div > img") ?
                document.querySelectorAll(" div._2mLllQ > ul > li > div > div > img").forEach(elem => {
                    image.push(elem.src.replaceAll("128","540"))
                }) : "nor found"

            // geting image-------------
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

        browser.close();
        // console.log(productDetails);
        return productDetails

    } catch (error) {

        console.log({
            "Error at fs": error.message
        })
    }

});

// flipkartScraper("https://www.flipkart.com/xiaomi-11i-5g-stealth-black-128-gb/p/itm8f69666fd662e?pid=MOBG9QXP5NVYGGHY&lid=LSTMOBG9QXP5NVYGGHYSMMSFL&marketplace=FLIPKART&fm=productRecommendation%2Fsimilar&iid=R%3As%3Bp%3AMOBG9QXPWYHJ99GV%3Bpt%3App%3Buid%3Aeb94ea7e-7489-11ed-b005-2de9e8854495%3B.MOBG9QXP5NVYGGHY&ppt=pp&ppn=pp&ssid=jyq7kvtjuo0000001670237114134&otracker=pp_reco_Similar%2BProducts_6_34.productCard.PMU_HORIZONTAL_Xiaomi%2B11i%2B5G%2B%2528Stealth%2BBlack%252C%2B128%2BGB%2529_MOBG9QXP5NVYGGHY_productRecommendation%2Fsimilar_5&otracker1=pp_reco_PINNED_productRecommendation%2Fsimilar_Similar%2BProducts_GRID_productCard_cc_6_NA_view-all&cid=MOBG9QXP5NVYGGHY&ocmpid=BrandAd_Mi_Xiaomi11i5G_Mid-life_Google_Paid_SEM_GenKW_20221205&gclid=CjwKCAiAzKqdBhAnEiwAePEjkuYK1NU6U0kHjzIp_T9XZO--Sd4N-wN_4T8-Xi0KKxMuN8hG2hATQxoCoksQAvD_BwE")



module.exports = flipkartScraper



