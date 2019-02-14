const options = require("@jhanssen/options")("camera-trigger");
const WebSocket = require("ws");

const host = options("host", "localhost");
const port = options.int("port", 8799);

const camera = options("camera");
const type = options("type");

if (!camera || !type) {
    console.error("needs a camera and type");
    process.exit(1);
}

const ws = new WebSocket(`ws://${host}:${port}/`);
ws.on('open', () => {
    ws.send(JSON.stringify({ camera: camera, type: type }));
});
ws.on('close', () => {
    process.exit(0);
});
ws.on("error", err => {
    console.error("websocket errror", err);
    process.exit(1);
});
