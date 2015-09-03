#!/usr/bin/env node

var argv = require('yargs')
        .usage('Usage: $0 [remote-name] [branch-name]')
        .argv

var shell = require('shelljs');
var os = require('os');
var cmd,
    remote,
    remoteKey,
    urlFromConfig,
    actualUrl,
    gitFlavor,
    branch,
    branchUrlSegment,
    openCommand
;

if (shell.exec('git rev-parse --is-inside-work-tree &>/dev/null').code !== 0) {
    shell.echo('### Error: Not a git repository.');
    shell.exit(1);
}

// Assume origin if not provided
remote = argv._[0] ? argv._[0] : 'origin'

remoteKey = "remote." + remote + ".url"

cmd = shell.exec('git config --get ' + remoteKey, {silent:true});
if (cmd.code !== 0) {
    shell.echo('### Error: ' + remoteKey + ' not set');
    shell.exit(1);
} else {
    urlFromConfig = cmd.output.trim();
}

['gitlab', 'bitbucket', 'github'].forEach(function(f) {
    if (urlFromConfig.match(f)) {
        gitFlavor = f;
    }
})
// console.log('### INFO: Git Flavor is ' + gitFlavor);

actualUrl = urlFromConfig
    .replace(/:/,'/')
    .replace(/^.*git@/, 'https://')
    .replace(/\.git/, '')
;

// Get current branch
if (argv._[1]) {
    branch = argv._[1]
} else {
    cmd = shell.exec('git symbolic-ref -q --short HEAD', {silent:true});
    if (cmd.code !== 0) {
        shell.echo('### Error: Something went wrong getting current branch');
        shell.exit(1);
    } else {
        branch = cmd.output.trim();
    }
}

switch (gitFlavor) {
    case 'gitlab':
    case 'github':
        branchUrlSegment = '/tree/';
        break;
    case 'bitbucket':
        branchUrlSegment = '/branch/';
        break;
}

actualUrl += (branchUrlSegment + branch);


switch (os.platform()) {
    case 'darwin':
        openCommand = 'open';
        break;
    case 'win32':
        openCommand = 'start';
        break;
    default:
        openCommand = 'xdg-open';
}

shell.exec(openCommand + ' ' + actualUrl);