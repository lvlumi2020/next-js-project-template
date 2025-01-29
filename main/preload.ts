import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
  once(channel: string, callback: (...args: any[]) => void): () => void {
    const subscription = (_event: Electron.IpcRendererEvent, ...args: any[]) =>
      callback(...args)

    ipcRenderer.once(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  }
}

contextBridge.exposeInMainWorld('ipc', handler)

export type IpcHandler = typeof handler
