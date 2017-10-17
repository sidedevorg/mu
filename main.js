const { app, Tray, Menu } = require('electron')
const AutoLaunch = require('auto-launch');
const shell = require('shelljs');

let locale = 'en';
let allFiles = null;
let launcher = false;

var muAutoLauncher = new AutoLaunch({
  name: 'mu',
  path: '/Applications/mu.app',
});

shell.config.execPath = '/usr/local/bin/node';
app.dock.hide();

/**
 * App is ready ... init!
 */
app.on('ready', function() {

  muAutoLauncher.isEnabled().then(function(isEnabled) {
    if (isEnabled) {
        launcher = true;
    }

    locale = app.getLocale();
    allFiles = showAllFiles();
    setMenu();

  });

});

/**
 * showAllFiles
 */
function showAllFiles() {

  var process = shell.exec('defaults read com.apple.finder AppleShowAllFiles',
    { async:false, silent:true}
  ).stdout;

  if (process == 'false\n') {
    return false;
  }
  return true;
}

/**
 * Set menu application
 */
function setMenu() {

  tray = new Tray(__dirname + '/muTemplate.png')

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show hidden files', type: 'checkbox', checked: allFiles, click (item) {
      shell.exec('defaults write com.apple.finder AppleShowAllFiles '+ item.checked +' && KillAll Finder',
        { async:false, silent:true}
      );
    }},
    {type: 'separator'},
    {label: 'Start app on system startup', type: 'checkbox', checked: launcher, click(item) {
      if (item.checked) {
        muAutoLauncher.enable();
      } else {
        muAutoLauncher.disable();
      }
    }},
    {type: 'separator'},
    {label: 'Quit', click (item, focusedWindow) {
      app.quit();
    }}
  ]);

  tray.setToolTip('mu - mac utilities');
  tray.setContextMenu(contextMenu);
}
