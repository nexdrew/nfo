#!/usr/bin/env node
'use strict'
let args = process.argv.slice(2)

if (args.length === 0 || args.some(a => /^-*(help)$|^-+h$/.test(a))) {
  console.log(`Usage: ${red('nfo')} ${yellow('[opts]')} ${red('<field> <package> [packages..]')}`)
  console.log(`\nExecute ${blue('npm info <package> <field>')} for each package given.`)
  console.log(`If only one argument is given, it is assumed to be a package name; otherwise a ${red('<field>')} is required.\n`)
  console.log('Arguments:')
  console.log(`  ${red('<field>')}                 A dot-delimited path to a field in the JSON output of ${blue('npm info')}.`)
  console.log(`                          This field will be extracted for each package given. Use ${red('.')} for all info.`)
  console.log('                          Examples: time, dist-tags, dist.tarball\n')
  console.log(`  ${red('<package> [packages..]')}  One or more package names, including scope and optional version number.`)
  console.log('                          Example: yargs @slack/client lodash@4.17.2\n')
  console.log('Options:')
  console.log(`  ${yellow('-j')}, ${yellow('--json')}              Output aggregated results as JSON`)
  console.log(`  ${yellow('-h')}, ${yellow('--help')}              Print this help text and exit`)
  console.log(`  ${yellow('-v')}, ${yellow('--version')}           Print nfo version and exit\n`)
  console.log(`Run ${blue('npm help info')} for more details on acceptable arguments.\n`)
  process.exit(0)
} else if (args.some(a => /^-+(version|v)$/.test(a))) {
  console.log(require('./package.json').version)
  process.exit(0)
}

function red (str) {
  return `\u001B[31m${str}\u001B[39m`
}

function yellow (str) {
  return `\u001B[33m${str}\u001B[39m`
}

function blue (str) {
  return `\u001B[34m${str}\u001B[39m`
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
    console.log(yellow(pkg))
    console.log(results[pkg] && results[pkg].value)
    console.log()
  })
}).catch(err => {
  console.error(err)
  process.exit(1)
})
