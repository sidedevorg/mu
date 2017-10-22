const shell = require('shelljs');
const System = require('./system');
const Str = require('./str');

function screenCapture() {

  shell.config.execPath = '/usr/local/bin/node';

  this.system = new System();
  this.str = new Str();

  this.readType = function() {

    let process = shell.exec('defaults read com.apple.screencapture type',
      { async:false, silent:true }
    ).stdout;

    return this.str.clean(process);
  };

  this.isType = function(type) {

    if (this.readType() == type) {
      return true;
    }

    return false;
  };

  this.take = function() {

    let type = this.readType();
    shell.exec('screencapture -t ' + type + ' /Users/' + this.system.username() + '/Desktop/' + Math.floor(Date.now() / 1000) + '.' + type);

  }

  this.setType = function(type) {

    shell.exec('defaults write com.apple.screencapture type ' + type);

  };

}

module.exports = screenCapture;