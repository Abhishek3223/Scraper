const Express = require("express");
const router = Express.Router();
const fetchUSER = require('../Middleware/FtechUsers');
// const compData = require("../models/compSchema");
const commentData = require("../models/commentScehma")
const { body, validationResult } = require('express-validator');



router.post('/addcomment', fetchUSER,
    [
        //  these are validation check..
        body('msg', ' there is the need of atleast 5 letter ').isLength({ min: 5 }),
        body('username', ' there is the need of atleast 5 letter ').exists()

    ],
    async (req, res) => {

        try {
            const { username, msg } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // date creation
            const date = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const d = new Date();
            let month = months[d.getMonth()];
            let day = date.getDate();
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            // console.log(currentDate);

            let comment = await commentData.create({
                user: req.user.id,
                userName: username,
                message: msg,
                date: currentDate
            })

            const saveNotes = await comment.save();
            res.send(saveNotes)

        } catch (err) {
            // console.log(err.message);
            res.status(404).json(
                { "Error occouured !! ": err.message }
            );
        }

    })

router.get('/getComment',
    async (req, res) => {

        try {
            const allData = await commentData.find()
            res.send(allData)
        } catch (err) {
            // console.log(err.message);
            res.status(404).json(
                {
                    "Error occouured !! ": err
                }
            );
        }

    })


module.exports = router;