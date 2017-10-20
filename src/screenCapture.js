const shell = require('shelljs');

function screenCapture() {

  shell.config.execPath = '/usr/local/bin/node';

  this.readType = function() {

    let process = shell.exec('defaults read com.apple.screencapture type',
      { async:false, silent:true }
    ).stdout;

    return process.replace(/(\r\n|\n|\r)/gm,"");
  };

  this.isType = function(type) {

    if (this.readType() == type) {
      return true;
    }

    return false;
  };

  this.setType = function(type) {

    shell.exec('defaults write com.apple.screencapture type ' + type);

  };

}

module.exports = screenCapture;