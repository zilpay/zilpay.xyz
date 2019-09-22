const path = require('path')
const express = require('express')
const app = express()

const PUBLIC = '/app'

const DOC_DIST_DIR = express.static(path.join(__dirname, '../docs/.vuepress/dist'))

app.use(PUBLIC + '/documentation', DOC_DIST_DIR)

app.get('/ledger-bridge', (req, res, next) => {
  return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <body></body>
    <head>
      <script src="${PUBLIC}/ledger-bridge.js"></script>
    </head>
    </html>
  `)
})

module.exports = app
