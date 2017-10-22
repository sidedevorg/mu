const shell = require('shelljs');
const Str = require('./str');

function ip() {

  shell.config.execPath = '/usr/local/bin/node';

  this.str = new Str();

  this.readIp = function() {

    let process = shell.exec('curl ipecho.net/plain',
      { async:false, silent:true }
    ).stdout;

    return this.str.clean(process);

  };

  this.copyIp = function() {

    shell.exec('echo ' + this.readIp() + ' | pbcopy');

  };

}

module.exports = ip;