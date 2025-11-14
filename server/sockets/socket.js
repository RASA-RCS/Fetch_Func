let io;

const initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });

  return io;
};

const emitJobUpdate = (data) => {
  if (io) {
    io.emit("jobUpdated", data);
    console.log("📡 Emitted:", data);
  }
};

module.exports = { initSocket, emitJobUpdate };
