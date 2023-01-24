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
// module.exports = 
ScrapingFunc("https://www.amazon.in/Oppo-Aurora-Storage-Medium-CPH2249/dp/B09B4VYY2V/ref=sr_1_1_sspa?keywords=best+mobile+under+20000&qid=1673379251&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&smid=A1XWWAZDGI9V7F")

module.exports = ScrapingFunc



