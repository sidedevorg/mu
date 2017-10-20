const { app, Tray, Menu } = require('electron')
const HiddenFiles = require('./src/hiddenFiles');
const Launcher = require('./src/launcher');

let locale = 'en';
let launcherState = false;
let muLauncher = new Launcher();
let hFiles = new HiddenFiles();

app.dock.hide();

/**
 * App is ready ... init!
 */
app.on('ready', function() {

  muLauncher.isEnabled().then(function(isEnabled) {

    launcherState = isEnabled;
    locale = app.getLocale();
    setMenu();

  });

});

/**
 * Set menu application
 */
function setMenu() {

  tray = new Tray(__dirname + '/muTemplate.png')

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show hidden files', type: 'checkbox', checked: hFiles.readState(), click (item) {
      hFiles.setState(item.checked);
    }},
    {type: 'separator'},
    {label: 'Start app on system startup', type: 'checkbox', checked: launcherState, click(item) {
      muLauncher.setState(item.checked)
    }},
    {type: 'separator'},
    {label: 'Quit', click () {
      app.quit();
    }}
  ]);

  tray.setToolTip('mu - mac utilities');
  tray.setContextMenu(contextMenu);
}
