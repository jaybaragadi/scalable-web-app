import { useEffect, useState } from "react";
import API from "../api";

export default function TaskList({ refreshTrigger }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const loadTasks = async () => {
    const res = await API.get("/tasks", {
      params: { search, status },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const applyFilters = () => {
    loadTasks();
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setTimeout(loadTasks, 0);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div>
      <h3>Your Tasks</h3>

      {/* Search + Filter UI */}
      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title"
          style={{ padding: 6, flex: 1, maxWidth: 250 }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: 6 }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={applyFilters} style={{ padding: "6px 10px" }}>
          Apply
        </button>
        <button onClick={clearFilters} style={{ padding: "6px 10px" }}>
          Clear
        </button>
      </div>

      {tasks.length === 0 && <p>No tasks yet.</p>}

      {tasks.map((t) => (
        <div
          key={t._id}
          style={{
            border: "1px solid #e5e7eb",
            padding: 8,
            borderRadius: 4,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div>{t.title}</div>
            <small style={{ color: "#6b7280" }}>Status: {t.status}</small>
          </div>
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
