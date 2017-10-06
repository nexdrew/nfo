#!/usr/bin/env node
'use strict'
let args = process.argv.slice(2)

let lazy
function help () {
  if (!lazy) lazy = require('./help')
  return lazy
}

if (args.length === 0 || args.some(a => /^-*(help)$|^-+h$/.test(a))) {
  console.log(help().text)
  process.exit(0)
} else if (args.some(a => /^-+(version|v)$/.test(a))) {
  console.log(require('./package.json').version)
  process.exit(0)
}

let outputJson
args = args.filter(a => {
  let isJsonFlag = /^-+(json|j)$/.test(a)
  outputJson = outputJson || isJsonFlag
  return !isJsonFlag
})
const field = args.length === 1 ? undefined : args.splice(0, 1)[0]
const nfo = require('./index')
nfo(args, field).then(results => {
  if (outputJson) return console.log(JSON.stringify(results))
  console.log()
  args.forEach(pkg => {
    console.log(help().yellow(pkg))
    console.log(results[pkg] && results[pkg].value)
    console.log()
  })
}).catch(err => {
  console.error(err)
  process.exit(1)
})
