'use strict'
const cp = require('child_process')

module.exports = function nfo (packages, field) {
  const pkgs = [].concat(packages)
  const results = {}
  function next () {
    return pkgs.length === 0
      ? Promise.resolve(results)
      : aggregate(pkgs.splice(0, 1)[0], field, results).then(next)
  }
  return next()
}

function aggregate (pkg, field, agg) {
  return npmInfo(pkg, field).then(result => {
    agg[result.pkg] = { field: result.field }
    try {
      eval('agg[result.pkg].value = ' + String(result.stdout).trim()) // eslint-disable-line no-eval
    } catch (_) {
      agg[result.pkg].value = String(result.stdout).trim()
    }
    return agg
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
