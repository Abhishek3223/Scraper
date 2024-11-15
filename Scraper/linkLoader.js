

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './process.env') })

const mongoURI = `mongodb+srv://imabhishekranjan1100:${process.env.PASSWORD}@cluster0.kzhgbbm.mongodb.net/Scraper?retryWrites=true&w=majority`


const { MongoClient } = require("mongodb");
const sendEmail = require("./mail/mail");

var ScrapingFunc = require('./Scraper');
var ObjectId = require('mongodb').ObjectId;



const client = new MongoClient(mongoURI, { useNewUrlParser: true });

const run = async () => {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db("Scraper");
        const col = db.collection("comp_objs")
        const data = await col.find().toArray();
        console.log(data)



        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;




        data.forEach(async element => {
            // notification mail------------------
            let price1 = 0;
            let price2 = 0;

            if (element.url1.link) {

                const link = element.url1.link
                const d = await ScrapingFunc(link);
                console.log('the daata is ', d, link);
                if (d?.Actual_price) {
                    const newPrice = (d.Actual_price)
                    price1 = newPrice;
                    const newDiscountedPrice = (d.Discount_price)
                    var id = (element.url1._id).toString()
                    var o_id = new ObjectId(id);
                    const offers = JSON.stringify(d.offers)
                    const details = JSON.stringify(d.Details)
                    // console.log(details);
                    try {
                        col.updateOne({ "url1._id": o_id },
                            {
                                $set: {
                                    "url1.actualPrice": newPrice,
                                    "url1.offers": offers
                                },
                                $push: {
                                    "url1.priceData": newDiscountedPrice,
                                    "url1.timeData": currentDate
                                }
                            }, (err, data) => {
                                if (err) console.log(["error occoured !!", err]);
                                else {

                                    console.log(["Done !!!", data]);
                                }
                            }, { upsert: true, returnOriginal: false }
                        )
                        if (element.url1.discription === '[[], []]') {
                            console.log(`updated the discription of ${element._id}`);
                            col.updateOne({ "url1._id": o_id },
                                {
                                    $set: {
                                        "url1.discription": details
                                    }
                                })
                        }
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
            if (element.url2.link) {

                const link = element.url2.link
                const d = await ScrapingFunc(link);
                const newPrice = (d.Discount_price);
                price2 = newPrice
                const newDiscountedPrice = (d.Actual_price)
                const offers = JSON.stringify(d.offers)
                const details = JSON.stringify(d.Details)
                console.log(`details is`, details);
                var id = (element.url2._id).toString()
                var o_id = new ObjectId(id);

                try {
                    col.updateOne({ "url2._id": o_id },
                        {
                            $set: {
                                "url2.actualPrice": newPrice,
                                "url2.offers": offers
                            },
                            $push: {
                                "url2.priceData": newDiscountedPrice,
                                "url2.timeData": currentDate
                            }
                        }, (err, data) => {
                            if (err) console.log(["error occoured !!", err]);
                            else {

                                console.log(["Done !!!", data]);
                            }
                        }, { upsert: true, returnOriginal: false }
                    )

                    if (element.url2.discription === '[[], []]') {
                        console.log(`updated the discription of ${element._id}`);
                        col.updateOne({ "url1._id": o_id },
                            {
                                $set: {
                                    "url2.discription": details
                                }
                            })
                    }


                } catch (error) {
                    console.log(error)
                }

            }
            if ((element.notifyPrice >= price1 || element.notifyPrice >= price2) && element.notifyStatus) {

                const collection = db.collection("user_objs")
                const elem = await collection.findOne({ "_id": element.user })
                // console.log(elem.email);
                const link1 = element.url1.Link;
                const link2 = element.url2.link;
                sendEmail(elem.email, price1, link1, price2, link2)
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