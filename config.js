require("dotenv").config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

module.exports = {
  PORT
}
