import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getToken } from "@utils/jwt-helpers";
import BooksList from "@components/books/BooksList";
import DashboardMenu from "@components/menu/DashboardMenu";
import RequestList from "@components/requests/RequestList";
import "./dashboard.css";
import { UserContext } from "@/contexts/Users/UserContext";
import UsersList from "@components/users/UsersList";
import HistoryList from "@components/history/HistoryList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    const user = getToken();
    setToken(user);
    if (user) {
      return navigate("/dashboard");
    } else {
      return navigate("/login");
    }
  }, []);

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
              <h1>Welcome {token.name}</h1>
            </section>
          )}
          <section id="Books">
            <BooksList />
          </section>
          <section id="Users">
            <UsersList />
          </section>
          <section id="Request">
            <RequestList />
          </section>
          <section id="History">
            <HistoryList />
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
