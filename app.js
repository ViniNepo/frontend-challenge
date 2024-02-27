const {
  app,
  BrowserWindow,
  globalShortcut
} = require('electron')

let appWindow

function createWindow() {
  appWindow = new BrowserWindow({
    width: 400,
    height: 800,
    minWidth: 400,
    minHeight: 800,
    maxWidth: 400,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  appWindow.loadFile('dist/frontend-challenge/index.html')

  appWindow.on('closed', function () {
    appWindow = null
  })
}

app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
    console.log("F5 is pressed: Shortcut Disabled");
  });
});
app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
});

app.on('ready', () => {
  createWindow()
})
