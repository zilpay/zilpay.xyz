const path = require('path')
const express = require('express')
const app = express()

const PUBLIC = '/dapp'
const PUBLIC_DIR = express.static(path.join(__dirname, '../public'))

app.use(PUBLIC, PUBLIC_DIR)

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
