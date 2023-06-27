async function getBodyFromRequest (req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', data => {
      body += data
    })
    req.on('end', () => {
      try {
        body = JSON.parse(body)
        resolve(body)
      } catch (e) {
        reject(new Error('Failed at parsing body'))
      }
    })
  })
}

module.exports = { getBodyFromRequest }
