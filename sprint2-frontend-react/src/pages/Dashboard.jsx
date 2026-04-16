import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
      navigate("/");
      return;
    }

    setRole(userRole);

    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Dashboard - {role === "admin" ? "Admin" : "User"}</h2>

      <button
        onClick={handleLogout}
        style={{
          padding: "8px 15px",
          marginBottom: "15px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <div style={{ display: "grid", gap: "15px" }}>
        {role === "admin" ? (
          data.map((user) => (
            <Card
              key={user.id}
              title={user.name}
              description={user.email}
            />
          ))
        ) : (
          <Card
            title="Your Profile"
            description={`Welcome, ${data.length > 0 ? data[0].name : "User"}`}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;