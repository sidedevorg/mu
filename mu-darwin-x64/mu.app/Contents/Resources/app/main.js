const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

/* =============================================================================
MU - MAC UTILITIES APP
============================================================================= */

/**
 * Application vars
 */
const Tray = electron.Tray;
const Menu = electron.Menu;

const shell = require('shelljs');
shell.config.execPath = '/usr/local/bin/node';

let locale = 'en';
let allFiles = null;

/**
 * App is ready ... init!
 */
app.on('ready', function() {

  locale = app.getLocale();
  allFiles = showAllFiles();

  setMenu();

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

  tray = new Tray(__dirname + '/mu.png')

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show hidden files', type: 'checkbox', checked: allFiles, click (item, focusedWindow) {
      shell.exec('defaults write com.apple.finder AppleShowAllFiles '+ item.checked +' && KillAll Finder',
        { async:false, silent:true}
      );
    }},
    {type: 'separator'},
    {label: 'Quit', click (item, focusedWindow) {
      app.quit();
    }}
  ]);

  tray.setToolTip('mu - mac utilities');
  tray.setContextMenu(contextMenu);
}
