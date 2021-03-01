const express = require("express")

const server = express()

// DO YOUR MAGIC
const carsRouter = require("./cars/cars-router")

server.use(express.json())
server.use("/api/cars",carsRouter)

server.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).json({
        message:"Molly, you in danger girl"
    })
})

module.exports = server
