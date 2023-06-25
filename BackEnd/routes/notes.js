const Express = require("express");
const router = Express.Router();
const fetchUSER = require('../Middleware/FtechUsers');
const compData = require("../models/compSchema");

const { body, validationResult } = require('express-validator');
const ScrapingFunc = require("../Scraper/Scraper");

// route 1: ./notes/fetchNotes ---FETCH THE NOTES OF A PARTICULAR ID  ::: login required

router.get('/fetchItems', fetchUSER, async (req, res) => {
    try {
        const notes = await compData.find({ user: req.user.id })

        res.send(notes);
    } catch (err) {
        res.status(404).json({ "err occouured": err })
    }
})



// route 2: ./notes/addNotes ---ADD NOTES to A PARTICULAR ID ::: login required

router.post('/addItem', fetchUSER,
    [
        //  these are validation check..
        body('url1', 'Atleast add a link to analyse ').exists()
    ],
    async (req, res) => {

        try {
            const { url1, url2 } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const date = new Date();
            // console.log(date);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const d = new Date();
            let month = months[d.getMonth()];
            let day = date.getDate();
            let year = date.getFullYear();

            let currentDate = `${day}-${month}-${year}`;

            if (url2.link) {

                const url1Data = await ScrapingFunc(url1.link)
                const url2Data = await ScrapingFunc(url2.link)

                console.log(JSON.stringify(url1Data.Details));
                // console.log(url1Data.Details);
                // console.log(url2Data);

                const compRepel = new compData({
                    user: req.user.id,
                    url1: {
                        img: url1Data?.image,
                        link: url1.link,
                        discription: JSON.stringify(url1Data?.Details),
                        actualPrice: url1Data?.Actual_price,
                        priceData: [url1Data?.Discount_price],
                        timeData: [currentDate],
                        offers: JSON.stringify(url1Data.offers)
                    },
                    url2: {
                        img: url2Data?.image,
                        link: url2.link,
                        discription: JSON.stringify(url2Data?.Details),
                        actualPrice: url2Data?.Actual_price,
                        priceData: [url2Data?.Discount_price],
                        timeData: [currentDate],
                        offers: JSON.stringify(url2Data?.offers)
                    },
                    title: url1Data.title
                })
                const saveNotes = await compRepel.save();
                // res.send(saveNotes)
                const result = {
                    Newcomp: saveNotes, Success: true
                }
                res.send(result);
            }
            else {
                const url1Data = await ScrapingFunc(url1.link)
                // console.log(JSON.stringify(url1Data.Details));

                const compRepel = new compData({
                    user: req.user.id,
                    url1: {
                        img: url1Data?.image,
                        link: url1.link,
                        discription: JSON.stringify(url1Data?.Details),
                        actualPrice: url1Data?.Actual_price,
                        priceData: [url1Data?.Discount_price],
                        timeData: [currentDate],
                        offers: JSON.stringify(url1Data?.offers)
                    },
                    url2: { link: "" },
                    title: url1Data.title,
                })
                const saveNotes = await compRepel.save();
                // res.send(saveNotes)
                const result = {
                    Newcomp: saveNotes, Success: true
                }
                res.send(result);

            }


        } catch (err) {
            console.log(err.message);
            res.status(404).json({ "Error occouured  @notes !! ": err.message });
        }

    })



// route 3: ./notes/UpdateNotes ---Update NOTES to A PARTICULAR ID ::: login required


// put is generally  used for updation notes

router.put('/UpdateItem/:id', fetchUSER,

    async (req, res) => {
        try {
            // since after destructuring the notes the 
            // console.log(req.body);
            const { newPrice } = req.body

            const UpdatedItem = {}
            if (newPrice) { UpdatedItem.notifyPrice = newPrice };

            // making the application secure .....
            let previous_note = await compData.findById(req.params.id)
            if (!previous_note) {
                return res.status(404).send("Notes not Found")
            }
            // if the id is invalid which can be changed via tampering the endpoint then return not found
            // console.log(`notes to be updated  -- ${previous_note.id.toString()}`);
            // console.log(`id value is -- ${req.params.id}`);

            if ((previous_note.id.toString()) !== (req.params.id)) {
                return res.status(401).send("NOT allowed")
            }

            await compData.findByIdAndUpdate(req.params.id, {
                $set: UpdatedItem
            }, { new: false })

            res.json({ status: "Success", updatedPart: [{ previous_note }, { UpdatedItem }] })


        } catch (err) {
            // console.log(err.message);
            res.status(404).json(
                { status: "failure", "Internal Error occouured !! ": err.message }
            );
        }

    })
router.put('/UpdateItem/toggleNotification/:id', fetchUSER,

    async (req, res) => {
        try {


            // const UpdatedItem = {}
            // if (newPrice) { UpdatedItem.notifyPrice = newPrice };

            // making the application secure .....
            let previous_note = await compData.findById(req.params.id)
            if (!previous_note) {
                return res.status(404).send("Notes not Found")
            }
            // if the id is invalid which can be changed via tampering the endpoint then return not found
            // console.log(`notes to be updated  -- ${previous_note.id.toString()}`);
            // console.log(`id value is -- ${req.params.id}`);

            if ((previous_note.id.toString()) !== (req.params.id)) {
                return res.status(401).send("NOT allowed")
            }

            await compData.findByIdAndUpdate(req.params.id, {
                $set: {
                    notify: !(previous_note.notify)
                }
            }, { new: false })

            res.json({ status: "Success" })


        } catch (err) {
            res.status(404).json(
                { status: "failure", "Internal Error occouured !! ": err.message }
            );
        }

    })




// route 4: ./notes/DeleteNote ---DELETE NOTES to A PARTICULAR ID ::: login required


// Delete is generally  used for delete notes
// router.delete('/deleteItem/:id', fetchUSER,


//     async (req, res) => {
//         try {
//             // making the application secure .....
//             let previous_note = await compData.findById(req.params.id)
//             if (!previous_note) {
//                 return res.status(404).send("Notes not Found")
//             }
//             // if the id is invalid which can be changed via tampering the endpoint then return not found
//             console.log(`notes to be updated  -- ${previous_note.id.toString()}`);
//             console.log(`id value is -- ${req.params.id}`);


//             if ((previous_note.id.toString()) !== (req.params.id)) {
//                 return res.status(401).send("NOT allowed")
//             }

//             previous_note = await compData.findByIdAndDelete(req.params.id)
//             res.json({
//                 "sucess": "the note has been delted",
//                 "Note": previous_note
//             })


//         } catch (err) {
//             console.log(err.message);

//             res.status(404).json({ "Internal Error occouured !! ": err.message });


//         }

//     })
module.exports = router