'use strict'

const cp = require('child_process')
const cliPath = require('path').resolve(__dirname, '..', 'cli.js')

exports.cli = (args, envPath) => {
  return new Promise((resolve, reject) => {
    const opts = { encoding: 'utf8' }
    if (envPath) opts.env = Object.assign({}, process.env, { PATH: envPath })
    cp.execFile(cliPath, args ? args.split(/\s/) : [], opts, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (stderr) console.error(stderr)
      resolve(stdout)
    })
  })
}
