var url = "mongodb+srv://abhishek_1212:ashuashu@cluster0.nhsofb8.mongodb.net?retryWrites=true&w=majority";

const { MongoClient } = require("mongodb");

var ScrapingFunc = require('./Scraper')
var ObjectId = require('mongodb').ObjectId;



const client = new MongoClient(url, { useNewUrlParser: true });

const run = async () => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db("PriceComporator");
        const col = db.collection("comp_objs")
        const data = await col.find().toArray();
        // console.log(data)



        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;




        data.forEach(async element => {
            // console.log(element);
            if (element.url1.link) {

                const link = element.url1.link
                const d = await ScrapingFunc(link);
                // console.log(d);
                if (d.Actual_price) {
                    const newPrice = (d.Actual_price)
                    element.url1.actualPrice = newPrice
                    const newDiscountedPrice = (d.Discount_price)
                    // const newPriceData = element.url1.priceData.push(newDiscountedPrice)
                    // const newTimeData = element.url1.timeData.push(currentDate)
                    // console.log({
                    //     _id: element.url1._id,
                    //     newDiscountedPrice,
                    //     currentDate,
                    //     // newPriceData,
                    //     // newTimeData
                    // })

                    var id = (element.url1._id).toString()
                    var o_id = new ObjectId(id);

                    // console.log(o_id);
                    try {
                        col.findOneAndUpdate({ _id: o_id },
                            {
                                $set: {
                                    actualPrice: newPrice,
                                    // priceData: [newDiscountedPrice],
                                    // currentDate: [currentDate]
                                }
                            }, (err, data) => {
                                if (err) console.log(["error occoured !!", err]);
                                else {

                                    // console.log(["Done !!!", data]);
                                }
                            }, { upsert: true, returnOriginal: false }
                        )
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
            if (element.url2.link) {

                const link = element.url2.link
                const d = await ScrapingFunc(link);

                const newPrice = (d?.Discount_price)
                element.url2.actualPrice[0] = newPrice
                const newDiscountedPrice = (d.Actual_price)
                // element.url2.priceData.push(newDiscountedPrice)
                // element.url2.timeData.push(currentDate)

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
        // client.close();
        console.log("programs ends here");
    }
}
run();
module.exports = run