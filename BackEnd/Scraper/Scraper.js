const flipkartScraper = require("./flipkartScraper")
const amazonScraper = require("./amazonScraper")

const ScrapingFunc = async (url) => {

    if (url && (url.toString().slice(0, 18) == "https://www.amazon")) {
        console.log("going for amazon")
        return amazonScraper(url);
    }
    else if (url && (url.toString().slice(0, 20) == "https://www.flipkart")) {
        console.log("going for flipkart");
        return flipkartScraper(url);
    }
    else {
        // alert("enter a valid link please ie amazons or flipkart")
        console.log("enter a valid link please ie amazons or flipkart");
    }

}

// ScrapingFunc("https://www.flipkart.com/sony-alpha-full-frame-ilce-7m2k-bq-in5-mirrorless-camera-body-28-70-mm-lens/p/itm92df94dc68fff?pid=DLLF6QZPNKTQMS8J&lid=LSTDLLF6QZPNKTQMS8JIDUHNS&marketplace=FLIPKART&store=jek%2Fp31%2Ftrv&srno=b_1_1&otracker=hp_omu_Best%2Bof%2BElectronics_1_3.dealCard.OMU_Q5LU1U8PHMK6_3&otracker1=hp_omu_PINNED_neo%2Fmerchandising_Best%2Bof%2BElectronics_NA_dealCard_cc_1_NA_view-all_3&fm=neo%2Fmerchandising&iid=95196158-5c35-420d-9367-61f03c41dde5.DLLF6QZPNKTQMS8J.SEARCH&ppt=hp&ppn=homepage&ssid=477gdd9q680000001686091028233")

module.exports = ScrapingFunc



