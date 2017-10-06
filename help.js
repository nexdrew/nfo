'use strict'

function red (str) {
  return `\u001B[31m${str}\u001B[39m`
}

function yellow (str) {
  return `\u001B[33m${str}\u001B[39m`
}

function blue (str) {
  return `\u001B[34m${str}\u001B[39m`
}

module.exports = {
  yellow,
  text: `Usage: ${red('nfo')} ${yellow('[opts]')} ${red('<field> <package> [packages..]')}

Execute ${blue('npm info <package> <field>')} for each package given.
If only one argument is given, it is assumed to be a package name; otherwise a ${red('<field>')} is required.

Arguments:
  ${red('<field>')}                 A dot-delimited path to a field in the JSON output of ${blue('npm info')}.
                          This field will be extracted for each package given. Use ${red('.')} for all info.
                          Examples: time, dist-tags, dist.tarball

  ${red('<package> [packages..]')}  One or more package names, including scope and optional version number.
                          Example: yargs @slack/client lodash@4.17.2

Options:
  ${yellow('-j')}, ${yellow('--json')}              Output aggregated results as JSON
  ${yellow('-h')}, ${yellow('--help')}              Print this help text and exit
  ${yellow('-v')}, ${yellow('--version')}           Print nfo version and exit

Run ${blue('npm help info')} for more details on acceptable arguments.
`
}
