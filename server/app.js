const path = require('path')
const express = require('express')
const app = express()

app.use('/dapp', express.static(path.join(__dirname, '../dapps')))

module.exports = app
