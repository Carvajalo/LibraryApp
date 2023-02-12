import BooksList from "../../components/books/BooksList";
import "./dashboard.css";
import DashboardMenu from "../../components/menu/DashboardMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/jwt-helpers";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const user = getToken();
    if (user) {
      return navigate("/dashboard");
    } else {
      return navigate("/login");
    }
  }, [navigate]);

  const handleMenu = (boolean: boolean) => {
    return setIsActive(boolean);
  };
  return (
    <>
      <div className="container_dashboard">
        <DashboardMenu handleMenu={handleMenu} />
        <div className="dashboard_pages">
          {isActive && (
            <section id="home">
              <h1>Welcome ${"user"} to the Library App</h1>
            </section>
          )}
          <section id="Books">
            <BooksList />
          </section>
          <section id="Users">
            <h1>User</h1>
            <p>User CRUD</p>
          </section>
          <section id="Request">
            <h1>Request</h1>
            <p>Request CRUD</p>
          </section>
          <section id="History">
            <h1>History view</h1>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
