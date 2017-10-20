const { app, Tray, Menu } = require('electron')
const HiddenFiles = require('./src/hiddenFiles');
const Launcher = require('./src/launcher');
const ScreenCapture = require('./src/screenCapture');

let locale = 'en';
let launcherState = false;
let muLauncher = new Launcher();
let hFiles = new HiddenFiles();
let muScreenCapture = new ScreenCapture();

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
    {label: 'Save screenshots as', submenu: [
      {label: 'png', type: 'radio', checked:muScreenCapture.isType('png'), click () {
        muScreenCapture.setType('png')
      }},
      {label: 'jpg', type: 'radio', checked:muScreenCapture.isType('jpg'), click () {
        muScreenCapture.setType('jpg')
      }},
      {label: 'pdf', type: 'radio', checked:muScreenCapture.isType('pdf'), click () {
        muScreenCapture.setType('pdf')
      }},
    ]},
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
