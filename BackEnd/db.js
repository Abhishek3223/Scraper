const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://abhishek_1212:${process.env.PASSWORD}@cluster0.nhsofb8.mongodb.net/PriceComporator?retryWrites=true&w=majority`


const conectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        // insted o using  asycn and update we are using  call back function and we can also use async function
        console.log(`connected to mongo succesfully `)

    }
    )
}



module.exports = conectToMongo;
