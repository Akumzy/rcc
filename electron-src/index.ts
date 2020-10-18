// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, dialog } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { readFile, writeFileSync } from "fs";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);
  mainWindow.maximize();
  mainWindow.show();
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  event.sender.send("message", message);
});
ipcMain.on("save", async function onSave(_event: IpcMainEvent, data: any) {
  console.log(data);
  let s = await dialog.showSaveDialog({
    filters: [{ name: "Akuma RCC", extensions: ["akrcc"] }],
  });
  if (!s.canceled && s.filePath) {
    writeFileSync(
      `${s.filePath}${s.filePath.endsWith(".akrcc") ? "" : ".akrcc"}`,
      data,
    );
  }
});

ipcMain.on("import", async function onSave(event: IpcMainEvent, data: any) {
  console.log(data);
  let s = await dialog.showOpenDialog({
    filters: [{ name: "Akuma RCC", extensions: ["akrcc"] }],
  });
  if (!s.canceled) {
    readFile(s.filePaths[0], (err, d) => {
      if (err) {
        dialog.showErrorBox("Error", err.message);
      } else {
        event.sender.send("import", d);
      }
    });
  }
});
