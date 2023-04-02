const path = require('path')

const { app, BrowserWindow }  = require('electron')
const isDev = require('electron-is-dev')

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '../build/index.html')}`)

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' })
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})