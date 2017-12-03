const shell = require('shelljs');
const Str = require('./str');

function desktopIcons() {

  shell.config.execPath = '/usr/local/bin/node';

  this.str = new Str();

  this.readState = function() {

    let process = shell.exec('defaults read com.apple.finder CreateDesktop',
      { async:false, silent:true }
    ).stdout;

    if (this.str.clean(process) == '1') {
      return true;
    }
    return false;
  };

  this.setState = function(state) {

    shell.exec('defaults write com.apple.finder CreateDesktop -bool '+ state +'; KillAll Finder',
      { async:false, silent:true }
    );

  };

}

module.exports = desktopIcons;