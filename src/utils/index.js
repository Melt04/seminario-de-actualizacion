async function getBodyFromRequest (req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', data => {
      body += data
    })
    req.on('end', () => {
      body = JSON.parse(body)
      resolve(body)
    })
  })
}

module.exports = { getBodyFromRequest }
