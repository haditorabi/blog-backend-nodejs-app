const express = require("express")
const app = express();
const ping = require("./routes/ping")
const posts = require("./routes/posts")
const { NotFoundError } = require("./handlers/errorHandler")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
  
app.use("/ping", ping)
app.use("/posts", posts)

// app.get("/", (req, res, next) => {
//     res.status(200).json({ ping: "pong" })
// })

app.get("*", (req, res, next) => {
    
    return next(new NotFoundError(), req, res, next)
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message
    const stack = err.stack

    return res.status(status).json({
        error: message
    })
})

module.exports = app