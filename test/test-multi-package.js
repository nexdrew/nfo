'use strict'

const test = require('tap').test
const cli = require('./helper').cli

test('multi arg field and unversioned packages', t => {
  return cli('time rekcod @slack/client').then(stdout => {
    t.includes(stdout, `'0.1.0': '2016-03-01T16:01:49.804Z'`)
    t.includes(stdout, `'2.0.0-0': '2016-11-05T05:58:02.399Z'`)
    t.includes(stdout, `created: '2016-03-01T16:01:49.804Z'`)
    t.includes(stdout, `'2.3.0-beta.2': '2016-03-13T05:52:47.195Z'`)
    t.includes(stdout, `'3.13.0': '2017-09-12T17:30:35.313Z'`)
    t.includes(stdout, `created: '2016-02-28T20:49:31.061Z'`)
  })
})

test('multi arg subfield and versioned packages', t => {
  return cli('dist.tarball rekcod@0.1.0 @slack/client@3.13.0').then(stdout => {
    t.equal(stdout, `\n\u001B[33mrekcod@0.1.0\u001B[39m\nhttps://registry.npmjs.org/rekcod/-/rekcod-0.1.0.tgz\n\n\u001B[33m@slack/client@3.13.0\u001B[39m\nhttps://registry.npmjs.org/@slack/client/-/client-3.13.0.tgz\n\n`)
  })
})

test('multi arg subfield and versioned packages (with --json)', t => {
  return cli('dist.tarball rekcod@0.1.0 @slack/client@3.13.0 --json').then(stdout => {
    t.equal(stdout, `{"rekcod@0.1.0":{"field":"dist.tarball","value":"https://registry.npmjs.org/rekcod/-/rekcod-0.1.0.tgz"},"@slack/client@3.13.0":{"field":"dist.tarball","value":"https://registry.npmjs.org/@slack/client/-/client-3.13.0.tgz"}}\n`)
  })
})

test('multi arg subfield and unversioned packages', t => {
  return cli('license rekcod @slack/client').then(stdout => {
    t.equal(stdout, `\n\u001B[33mrekcod\u001B[39m\nISC\n\n\u001B[33m@slack/client\u001B[39m\nMIT\n\n`)
  })
})

test('multi arg subfield and versioned packages (with -j)', t => {
  return cli('-j license rekcod @slack/client').then(stdout => {
    t.equal(stdout, `{"rekcod":{"field":"license","value":"ISC"},"@slack/client":{"field":"license","value":"MIT"}}\n`)
  })
})
