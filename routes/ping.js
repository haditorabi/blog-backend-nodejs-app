const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
    try {
        res.send({"success":true})
    } catch (err) {
    next(err)
    }
})

module.exports = router

