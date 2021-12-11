const express = require('express')

const port = process.env.PORT || 8080
const app = express()

// Force HTTPS redirection
app.use((req, res, next) => {
  const nodeEnv = process.env.NODE_ENV
  if (!nodeEnv || nodeEnv !== 'production' || req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next()
  }
  return res.redirect(`https://${req.headers.host}${req.url}`)
})

app.use(express.static(`${__dirname}/dist/`))
app.get(/.*/, (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(port)

console.log('Server started')
