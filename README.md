# git-opener

Type `git open` to open the git repository in your browser.

Inspired by <https://github.com/paulirish/git-open>

Rewritten in node to make it easier to modify and more generic.

_Plus support Github Enterprise and Gitlab without extra config_

Note: I only spent about 30 minutes on this...
I'm sure there are a few little bugs. Just send a pull requiest or create an issue.

Also... only tested on Mac. Added logic for windows and unix but not tested.

## Usage
    git open [remote-name] [branch-name]

### Examples
    $ git open
    > open https://github.com/REMOTE_ORIGIN_USER/CURRENT_REPO/tree/CURRENT_BRANCH

    $ git open upstream
    > open https://github.com/REMOTE_UPSTREAM_USER/CURRENT_REPO/tree/CURRENT_BRANCH

    $ git open upstream master
    > open https://github.com/REMOTE_UPSTREAM_USER/CURRENT_REPO/tree/master

## Installation

```sh
npm install --global git-opener
```
