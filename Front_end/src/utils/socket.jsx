// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]
// ✅ Socket connection
const socket = io("http://localhost:9000", {
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