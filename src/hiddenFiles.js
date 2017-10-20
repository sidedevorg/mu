const shell = require('shelljs');

function hiddenFiles() {

  shell.config.execPath = '/usr/local/bin/node';

  this.readState = function() {

    let process = shell.exec('defaults read com.apple.finder AppleShowAllFiles',
      { async:false, silent:true }
    ).stdout;

    if (process == 'false\n') {
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