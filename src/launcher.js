const AutoLaunch = require('auto-launch');

function launcher() {

  let muAutoLauncher = new AutoLaunch({
    name: 'mu',
    path: '/Applications/mu.app',
  });

  this.isEnabled = function() {

    return muAutoLauncher.isEnabled().then(function(isEnabled) {
      if (isEnabled) {
        return true;
      }
      return false;
    });

  };

  this.setState = function(state) {

    if (state) {
      muAutoLauncher.enable();
    } else {
      muAutoLauncher.disable();
    }

  };

}

module.exports = launcher;