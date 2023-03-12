const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './process.env') })


const conectToMongo = require("./db")
const Express = require("express")


conectToMongo();
var cors = require('cors');
const { send } = require('process');
const app = Express()
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
    // origin: allowedOrigins,
    origin: ['http://localhost:3000', process.env.front_Origin],
    methods: ['GET', 'POST', "PUT"],
    allowedHeaders: ['Content-Type', 'auth-token'],
};
app.use(cors(corsOptions))

const port = process.env.PORT || 5000


app.use(Express.json())
// availabe rotes
app.get('/', function (req, res) {
    console.log("/user request called");
    res.send('welcome to scraper backend').status(200);
});
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/comment', require('./routes/Comment'))


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})



