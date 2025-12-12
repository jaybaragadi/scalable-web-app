export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        background: "#f9fafb",
      }}
    >
      <h3 style={{ marginBottom: 8 }}>Profile</h3>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.bio && (
        <p>
          <strong>Bio:</strong> {user.bio}
        </p>
      )}
    </div>
  );
}
