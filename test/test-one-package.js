'use strict'

const test = require('tap').test
const cli = require('./helper').cli

test('one arg unscoped package no version', t => {
  return cli('rekcod').then(stdout => {
    t.includes(stdout, `name: 'rekcod'`)
    t.includes(stdout, `description: 'docker inspect → docker run'`)
    t.includes(stdout, `'0.1.0'`)
    t.includes(stdout, `'2.0.0-0'`)
    t.includes(stdout, `created: '2016-03-01T16:01:49.804Z'`)
  })
})

test('one arg scoped package no version', t => {
  return cli('@slack/client').then(stdout => {
    t.includes(stdout, `name: '@slack/client'`)
    t.includes(stdout, `'2.3.0-beta.2'`)
    t.includes(stdout, `'3.13.0'`)
    t.includes(stdout, `created: '2016-02-28T20:49:31.061Z'`)
  })
})

test('one arg unscoped package with version', t => {
  return cli('rekcod@0.1.0').then(stdout => {
    t.includes(stdout, `name: 'rekcod'`)
    t.includes(stdout, `description: 'docker inspect -> docker run'`)
    t.includes(stdout, `shasum: '32752871e3ee7e474a497a974452a69836e76008'`)
    t.includes(stdout, `tarball: 'https://registry.npmjs.org/rekcod/-/rekcod-0.1.0.tgz'`)
  })
})

test('one arg scoped package with version', t => {
  return cli('@slack/client@3.13.0').then(stdout => {
    t.includes(stdout, `name: '@slack/client'`)
    t.includes(stdout, `description: 'A library for creating a Slack client'`)
    t.includes(stdout, `shasum: 'c4c297af5846210939773572f0c6985017754a13'`)
    t.includes(stdout, `tarball: 'https://registry.npmjs.org/@slack/client/-/client-3.13.0.tgz'`)
  })
})

test('two arg field and unscoped package', t => {
  return cli('time rekcod').then(stdout => {
    t.includes(stdout, `'0.1.0': '2016-03-01T16:01:49.804Z'`)
    t.includes(stdout, `'2.0.0-0': '2016-11-05T05:58:02.399Z'`)
    t.includes(stdout, `created: '2016-03-01T16:01:49.804Z'`)
  })
})

test('two arg field and scoped package', t => {
  return cli('time @slack/client').then(stdout => {
    t.includes(stdout, `'2.3.0-beta.2': '2016-03-13T05:52:47.195Z'`)
    t.includes(stdout, `'3.13.0': '2017-09-12T17:30:35.313Z'`)
    t.includes(stdout, `created: '2016-02-28T20:49:31.061Z'`)
  })
})
