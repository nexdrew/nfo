'use strict'
const cp = require('child_process')

module.exports = function nfo (packages, field) {
  const promises = []
  ;[].concat(packages).forEach(pkg => {
    promises.push(npmInfo(pkg, field))
  })
  return Promise.all(promises).then(results => {
    return results.reduce((agg, result) => {
      agg[result.pkg] = { field: result.field }
      try {
        eval('agg[result.pkg].value = ' + String(result.stdout).trim()) // eslint-disable-line no-eval
      } catch (_) {
        agg[result.pkg].value = String(result.stdout).trim()
      }
      return agg
    }, {})
  })
}

function npmInfo (pkg, field) {
  return new Promise((resolve, reject) => {
    cp.execFile('npm', ['info', pkg, field].filter(Boolean), (err, stdout, stderr) => {
      if (err) return reject(err)
      resolve({ pkg, field, stdout, stderr })
    })
  })
}
