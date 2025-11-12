// ✅ Socket connection
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

useEffect(() => {
  fetchJobs();

  socket.on("connect", () => {
    console.log("🟢 Connected to Socket.io server");
  });

  socket.on("jobUpdated", (data) => {
    console.log("📡 Job update received:", data);

    if (data.type === "added") {
      setJobs((prev) => [data.job, ...prev]);
      toast.success(`🆕 New job added: ${data.job.title}`);
    } else if (data.type === "updated") {
      setJobs((prev) =>
        prev.map((j) => (j._id === data.job._id ? data.job : j))
      );
      toast.info(`✏️ Job updated: ${data.job.title}`);
    } else if (data.type === "deleted") {
      setJobs((prev) => prev.filter((j) => j._id !== data.jobId));
      toast.warn(`🗑️ A job was removed.`);
    }
  });

  return () => {
    socket.off("jobUpdated");
  };
}, []);


export default socket;