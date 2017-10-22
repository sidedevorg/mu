const os = require('os');

function system() {

  this.username = function() {

    return os.userInfo().username;

  };

}

module.exports = system;