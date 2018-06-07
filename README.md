# nfo

> npm info with inverted args for multiple pkg support

[![Build Status](https://travis-ci.org/nexdrew/nfo.svg?branch=master)](https://travis-ci.org/nexdrew/nfo)
[![Coverage Status](https://coveralls.io/repos/github/nexdrew/nfo/badge.svg?branch=master)](https://coveralls.io/github/nexdrew/nfo?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/nexdrew/nfo.svg)](https://greenkeeper.io/)

Execute `npm info` against multiple packages all together. Useful for comparing the same field value across different published packages.

Since it just wraps `npm info`, it respects your registry config in `.npmrc` and works with private packages. No special command-line options needed. (It may also be slow for this reason.)

Note that `npm info` is just an alias for `npm view` or `npm show`.

## Examples

Get dist-tags of multiple packages in one run:

```console
$ nfo dist-tags yargs @slack/client yarn

yargs
{ latest: '6.5.0', next: '6.3.0-candidate' }

@slack/client
{ latest: '3.7.0', beta: '2.3.0-beta.2' }

yarn
{ latest: '0.18.1', rc: '0.18.0' }

```

Check published time:

```console
$ nfo time which-module ansi-align

which-module
{ modified: '2016-06-06T05:54:13.093Z',
  created: '2016-06-06T05:54:13.093Z',
  '1.0.0': '2016-06-06T05:54:13.093Z' }

ansi-align
{ modified: '2016-06-06T20:14:39.942Z',
  created: '2016-04-30T17:43:23.016Z',
  '1.0.0': '2016-04-30T17:43:23.016Z',
  '1.1.0': '2016-06-06T20:14:39.942Z' }
```

Output aggregated results as JSON:

```console
$ nfo dist.tarball standard browserify webpack -j | json
{
  "standard": {
    "field": "dist.tarball",
    "value": "https://registry.npmjs.org/standard/-/standard-8.6.0.tgz"
  },
  "browserify": {
    "field": "dist.tarball",
    "value": "https://registry.npmjs.org/browserify/-/browserify-13.1.1.tgz"
  },
  "webpack": {
    "field": "dist.tarball",
    "value": "https://registry.npmjs.org/webpack/-/webpack-1.14.0.tgz"
  }
}
```

## Install

### CLI

```console
$ npm i -g nfo
```

```console
$ nfo help
Usage: nfo [opts] <field> <package> [packages..]

Execute npm info <package> <field> for each package given.
If only one argument is given, it is assumed to be a package name; otherwise a <field> is required.

Arguments:
  <field>                 A dot-delimited path to a field in the JSON output of npm info.
                          This field will be extracted for each package given. Use . for all info.
                          Examples: time, dist-tags, dist.tarball

  <package> [packages..]  One or more package names, including scope and optional version number.
                          Example: yargs @slack/client lodash@4.17.2

Options:
  -j, --json              Output aggregated results as JSON
  -h, --help              Print this help text and exit
  -v, --version           Print nfo version and exit

Run npm help info for more details on acceptable arguments.
```

### Module

```console
$ npm i --save nfo
```

```js
const nfo = require('nfo')
nfo(packages, field).then(results => console.log(results))
```

## License

ISC © Contributors
