'use strict'

const test = require('tap').test
const cli = require('./helper').cli
const helpText = require('../help').text + '\n'
const version = require('../package.json').version + '\n'

test('no args', t => {
  return cli().then(stdout => {
    t.equal(stdout, helpText)
  })
})

test('one option -h', t => {
  return cli('-h').then(stdout => {
    t.equal(stdout, helpText)
  })
})

test('one option --help', t => {
  return cli('--help').then(stdout => {
    t.equal(stdout, helpText)
  })
})

test('one option -v', t => {
  return cli('-v').then(stdout => {
    t.equal(stdout, version)
  })
})

test('one option --version', t => {
  return cli('--version').then(stdout => {
    t.equal(stdout, version)
  })
})

test('no npm in PATH', t => {
  return cli('rekcod', '/dne').catch(err => {
    t.equal(err.code, 1)
    t.includes(err.message, 'spawn npm ENOENT')
  })
})
