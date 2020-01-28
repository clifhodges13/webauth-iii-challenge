const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()
const router = require("./router/router")

const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 5000

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api', router)

server.use((err, req, res, next) => res.status(500).json({ message: 'A server error occurred.' }))

server.listen(PORT, () => console.log(`Mommy's alright, Daddy's alright. Server listening at ${HOST}:${PORT}.`))