const path = require('path')
const express = require('express')
const app = express()

const DOC_DIST_DIR = express.static(path.join(__dirname, '../dist/Documentation'))

app.use('/documentation', DOC_DIST_DIR)

module.exports = app
