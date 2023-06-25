const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://imabhishekranjan1100:${process.env.PASSWORD}@cluster0.kzhgbbm.mongodb.net/Scraper?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);

const conectToMongo = () => {
    try {
        mongoose.connect(mongoURI, () => {

            // insted o using  asycn and update we are using  call back function and we can also use async function
            console.log(`connected to mongo succesfully `)

        }
        )
    } catch (error) {
        console.log({ "Failed to connect": error });

    }

}



module.exports = conectToMongo;
