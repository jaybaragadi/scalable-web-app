import { useState } from "react";
import API from "../api";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    if (onCreated) onCreated();
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
        style={{ padding: 8, width: "250px", marginRight: 8 }}
      />
      <button type="submit" style={{ padding: "8px 12px" }}>
        Add Task
      </button>
    </form>
  );
}
