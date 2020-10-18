"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const url_1 = require("url");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
const fs_1 = require("fs");
// Prepare the renderer once the app is ready
electron_1.app.on("ready", async () => {
    await electron_next_1.default("./renderer");
    const mainWindow = new electron_1.BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: false,
            preload: path_1.join(__dirname, "preload.js"),
        },
        autoHideMenuBar: true,
    });
    const url = electron_is_dev_1.default
        ? "http://localhost:8000/"
        : url_1.format({
            pathname: path_1.join(__dirname, "../renderer/out/index.html"),
            protocol: "file:",
            slashes: true,
        });
    mainWindow.loadURL(url);
    mainWindow.maximize();
    mainWindow.show();
});
// Quit the app once all windows are closed
electron_1.app.on("window-all-closed", electron_1.app.quit);
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on("message", (event, message) => {
    event.sender.send("message", message);
});
electron_1.ipcMain.on("save", async function onSave(_event, data) {
    console.log(data);
    let s = await electron_1.dialog.showSaveDialog({
        filters: [{ name: "Akuma RCC", extensions: ["akrcc"] }],
    });
    if (!s.canceled && s.filePath) {
        fs_1.writeFileSync(`${s.filePath}${s.filePath.endsWith(".akrcc") ? "" : ".akrcc"}`, data);
    }
});
electron_1.ipcMain.on("import", async function onSave(event, data) {
    console.log(data);
    let s = await electron_1.dialog.showOpenDialog({
        filters: [{ name: "Akuma RCC", extensions: ["akrcc"] }],
    });
    if (!s.canceled) {
        fs_1.readFile(s.filePaths[0], (err, d) => {
            if (err) {
                electron_1.dialog.showErrorBox("Error", err.message);
            }
            else {
                event.sender.send("import", d);
            }
        });
    }
});
