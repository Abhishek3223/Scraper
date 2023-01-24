// var url = "mongodb+srv://abhishek_1212:ashuashu@cluster0.nhsofb8.mongodb.net?retryWrites=true&w=majority";
var mongoose = require('mongoose');
var db = require('./db');
// create an schema
const comp_objs = require('./models/compSchema')


const run = async () => {
    try {
        const data = await comp_objs.find()
        console.log(data)

        const date = new Date();

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date();
        let month = months[d.getMonth()];
        let day = date.getDate();
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;
        console.log(d);

        data.forEach(async element => {
            console.log(element);
            if (element.url1.link) {

                const link = element.url1.link
                const d = await ScrapingFunc(link);
                console.log(d);
                if (d.Actual_price) {
                    const newPrice = await (d.Actual_price)
                    element.url1.actualPrice = newPrice
                    const newDiscountedPrice = (d.Discount_price)
                    // const newPriceData = element.url1.priceData.push(newDiscountedPrice)
                    // const newTimeData = element.url1.timeData.push(currentDate)
                    console.log({
                        _id: element.url1._id,
                        newDiscountedPrice,
                        currentDate,
                        // newPriceData,
                        // newTimeData
                    })
                    var id = (element.url1._id).toString()
                    console.log(
                        id
                    );
                    try {
                        await col.findOneAndUpdate({ _id: "63bdd22434a05f6bf0f3190f" },
                            {
                                $set: {
                                    actualPrice: newPrice,
                                    priceData: [newDiscountedPrice],
                                    currentDate: [currentDate]
                                }
                            }
                        )
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
            if (element.url2.link) {

                const link = element.url2.link
                const d = await ScrapingFunc(link);

                const newPrice = (d.Discount_price)
                element.url2.actualPrice[0] = newPrice
                const newDiscountedPrice = (d.Actual_price)
                element.url2.priceData.push(newDiscountedPrice)
                element.url2.timeData.push(currentDate)

                await col.updateOne({ _id: element.url1._id },
                    {
                        $set: {
                            actualPrice: newPrice,

                        }
                    }
                )

            }
            console.log(element)

        })

    } catch (err) {
        console.log(err);
    }
    finally {
        console.log("programs ends here");
    }
};
run();
module.exports = run