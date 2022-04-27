const http = require('http')
const os = require('os')

const PORT = process.env.PORT || 8080
const SEND_ENV = process.env.SEND_ENV || 'true'
const SEND_HEADERS = process.env.SEND_HEADERS || 'true'

console.log(`### Starting server on port ${PORT}...`)

// Create a HTTP server
http
  .createServer(function (req, res) {
    // Logic to get hostname, handles Azure app service
    var hostname = process.env['WEBSITE_SITE_NAME']
      ? process.env['WEBSITE_SITE_NAME'] + '.azurewebsites.net'
      : os.hostname()

    // Swagger for APIM
    if (req.url.includes('swagger.json')) {
      let swagger = require('fs').readFileSync('swagger.json').toString()
      swagger = swagger.replace('%%HOSTNAME%%', hostname)
      res.setHeader('content-type', 'application/json')
      res.write(swagger)
      res.end()
      return
    }

    var x_client = req.headers['x-client-ip'] || 'none'
    var x_forwarded = req.headers['x-forwarded-for'] || 'none'

    // Just echo back useful stuff
    apiResp = {
      echo: req.url,
      method: req.method,
      serverHostname: hostname,
      sourceIP: req.connection.remoteAddress,

      xClientIP: x_client,
      xForwardedFor: x_forwarded,

      serverInfo: {
        type: os.type(),
        coreCount: os.cpus().length,
        coreModel: os.cpus()[0].model,
        osArch: os.arch(),
        osRelease: os.release(),
      },
    }

    // Include env vars
    if (SEND_ENV === 'true') {
      apiResp.env = process.env
    }

    if (SEND_HEADERS === 'true') {
      apiResp.requestHeaders = req.headers
    }

    // Log on server so we can see what the source IP was
    console.log(`### ${new Date()} - request received`)
    console.log(`###    ${apiResp.method} ${apiResp.echo}`)
    console.log(`###    sourceIP: [${apiResp.sourceIP}]`)
    console.log(`###    xClientIP: [${x_client}]`)
    console.log(`###    xForwardedFor: [${x_forwarded}]`)

    // Send back JSON response
    res.setHeader('content-type', 'application/json')
    res.write(JSON.stringify(apiResp, null, 3))
    res.end()
  })
  .listen(PORT) // The server object listens on port 8080
