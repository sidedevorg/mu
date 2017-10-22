const shell = require('shelljs');
const Str = require('./str');

function hiddenFiles() {

  shell.config.execPath = '/usr/local/bin/node';

  this.str = new Str();

  this.readState = function() {

    let process = shell.exec('defaults read com.apple.finder AppleShowAllFiles',
      { async:false, silent:true }
    ).stdout;

    if (this.str.clean(process) == 'false') {
      return false;
    }
    return true;
  };

  this.setState = function(state) {

    shell.exec('defaults write com.apple.finder AppleShowAllFiles '+ state +' && KillAll Finder',
      { async:false, silent:true }
    );

  };

}

module.exports = hiddenFiles;