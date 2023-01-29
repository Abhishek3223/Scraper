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

// ScrapingFunc("https://www.flipkart.com/oneplus-10r-5g-sierra-black-256-gb/p/itm6869e4c9a3001?pid=MOBGEYQA3SHGBGTF&lid=LSTMOBGEYQA3SHGBGTFJMCCTO&marketplace=FLIPKART&q=onplus10&store=tyy%2F4io&spotlightTagId=BestvalueId_tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=a9b126a2-e10f-4b79-9b87-64f64c2e53b7.MOBGEYQA3SHGBGTF.SEARCH&ppt=sp&ppn=sp&ssid=awppij7hps0000001673070557541&qH=e87347da1b1074b6")

module.exports = ScrapingFunc



