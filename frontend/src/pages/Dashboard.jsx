import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const handleTaskCreated = () => {
    setRefreshFlag((x) => x + 1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <ProfileCard user={user} />
      <TaskForm onCreated={handleTaskCreated} />
      <TaskList refreshTrigger={refreshFlag} />
    </div>
  );
}
