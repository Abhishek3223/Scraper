const flipkartScraper = require("./flipkartScraper")
const amazonScraper = require("./amazonScraper")

const ScrapingFunc = async (url) => {

    if (url && (url.slice(0, 18) == "https://www.amazon")) {
        console.log("going for amazon")
        return await amazonScraper(url);
    }
    else {
        console.log("going for flipkart");
        return await flipkartScraper(url);
    }

}
// module.exports = ScrapingFunc()

module.exports =  ScrapingFunc



