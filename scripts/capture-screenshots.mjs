import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const chromePaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
];

const browserPath = chromePaths.find((candidate) => existsSync(candidate));

if (!browserPath) {
  throw new Error("Chrome or Edge was not found for screenshot verification.");
}

const root = process.cwd();
const outputDir = path.join(root, "screenshots");
await fs.mkdir(outputDir, { recursive: true });

async function waitForJson(port, endpoint) {
  const url = `http://127.0.0.1:${port}${endpoint}`;
  const started = Date.now();

  while (Date.now() - started < 10000) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const pending = new Map();
  let id = 0;

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const message = { id: ++id, method, params };
      pending.set(message.id, { resolve, reject });
      ws.send(JSON.stringify(message));
    });

  return { ws, send };
}

async function capture({ name, width, height, isMobile, port }) {
  const userDataDir = path.join(os.tmpdir(), `rdafc-${name}-${Date.now()}`);
  const proc = spawn(
    browserPath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--hide-scrollbars",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      `--window-size=${width},${height}`,
      "about:blank"
    ],
    { stdio: "ignore" }
  );

  try {
    const tabs = await waitForJson(port, "/json/list");
    const page = tabs.find((tab) => tab.type === "page") ?? tabs[0];
    const { ws, send } = await connect(page.webSocketDebuggerUrl);

    await send("Page.enable");
    await send("Runtime.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile,
      isMobile
    });

    const loaded = new Promise((resolve) => {
      const timeout = setTimeout(resolve, 8000);
      const onMessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.method === "Page.loadEventFired") {
          clearTimeout(timeout);
          ws.removeEventListener("message", onMessage);
          resolve();
        }
      };
      ws.addEventListener("message", onMessage);
    });

    await send("Page.navigate", { url: "http://127.0.0.1:3000" });
    await loaded;
    await send("Runtime.evaluate", {
      awaitPromise: true,
      expression:
        "Promise.race([Promise.all([document.fonts?.ready, ...Array.from(document.images).filter((img) => img.getBoundingClientRect().top < innerHeight + 240).map((img) => img.complete ? true : new Promise((resolve) => { img.onload = img.onerror = resolve; }))]), new Promise((resolve) => setTimeout(resolve, 5000))])"
    });
    const started = Date.now();
    while (Date.now() - started < 7000) {
      const result = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: "!document.querySelector('[data-loading-screen]')"
      });
      if (result.result.value) break;
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    await new Promise((resolve) => setTimeout(resolve, 700));

    const screenshot = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false
    });
    const filePath = path.join(outputDir, `${name}.png`);
    await fs.writeFile(filePath, Buffer.from(screenshot.data, "base64"));
    ws.close();
    console.log(filePath);
  } finally {
    proc.kill();
    await new Promise((resolve) => {
      if (proc.exitCode !== null) {
        resolve();
        return;
      }
      const timeout = setTimeout(resolve, 1200);
      proc.once("exit", () => {
        clearTimeout(timeout);
        resolve();
      });
    });
    await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  }
}

await capture({ name: "mobile-home", width: 390, height: 844, isMobile: true, port: 9222 });
await capture({ name: "desktop-home", width: 1440, height: 1100, isMobile: false, port: 9223 });
