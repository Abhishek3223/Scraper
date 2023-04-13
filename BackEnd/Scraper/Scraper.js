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

// ScrapingFunc("https://www.flipkart.com/cougar-hexa-dumbbells-5kg-pair-rubber-coated-professional-hex-dumbbell-set-fixed-weight/p/itmc9eff384d9649?pid=DBLFWVR59QB3TE8V&lid=LSTDBLFWVR59QB3TE8VIX3IAL&marketplace=FLIPKART&store=qoc%2Facb%2Fzuc&srno=b_1_1&otracker=browse&iid=en_Lp9Qt%2BW%2BmFdz5VS7wEYZF9%2BafUbYshUGHIfI4g%2FrJEW%2FWFv22NsXDkWMom1LP9D%2F7u2Gi0BZ8wzLnj27YrHxRw%3D%3D&ssid=y8ld301cpc0000001675196305673")

module.exports = ScrapingFunc



