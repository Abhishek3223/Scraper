const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './config.env') })


const conectToMongo = require("./db")
const Express = require("express")


conectToMongo();
var cors = require('cors')
const app = Express()
app.use(cors())
const port = 5000

app.use(Express.json())
// availabe rotes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/comment', require('./routes/Comment'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})



