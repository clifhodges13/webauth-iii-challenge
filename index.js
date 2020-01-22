const express = require("express")

const server = express()

const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server listening at ${HOST}:${PORT}.`))