const app = require("./app.js");
const { PORT } = require("./config")

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})

module.exports = server