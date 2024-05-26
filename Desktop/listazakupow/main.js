const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let shoppingList = [];

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.on('addItem', (event, item) => {
  console.log('Received addItem request:', item);
  shoppingList.push(item);
  updateShoppingList();
});

ipcMain.on('removeItem', (event, index) => {
  console.log('Received removeItem request:', index);
  shoppingList.splice(index, 1);
  updateShoppingList();
});

ipcMain.on('getShoppingList', (event) => {
  console.log('Received getShoppingList request');
  updateShoppingList();
});

function updateShoppingList() {
  mainWindow.webContents.send('updateShoppingList', shoppingList);
}
