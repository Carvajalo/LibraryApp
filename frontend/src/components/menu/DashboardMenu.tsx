import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@contexts/Users/UserContext";
import { removeToken, getToken } from "@utils/jwt-helpers";
import "./style.css";

interface Props {
  handleMenu: (boolean: boolean) => void;
}

const DashboardMenu = (props: Props) => {
  const navigate = useNavigate();
  const { setToken, role, setRole } = useContext(UserContext);

  const { handleMenu } = props;

  useEffect(() => {
    const userToken = getToken();
    if (userToken) {
      setToken(userToken);
      setRole(userToken.role);
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setToken({
      name: "",
      role: "",
      token: "",
    });
    setRole("");
    navigate("/login");
  };
  return (
    <>
      <nav className="main__menu">
        <ul>
          <li onClick={() => handleMenu(true)}>
            <a href="#Home">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav__text">Home</span>
            </a>
          </li>
        </ul>
        <ul className="main__menu__list">
          <li onClick={() => handleMenu(false)}>
            <a href="#Books">
              <i className="fa fa-book fa-2x"></i>
              <span className="nav__text">Books</span>
            </a>
          </li>

          <li onClick={() => handleMenu(false)}>
            <a href="#Request">
              <i className="fa fa-exchange fa-2x"></i>
              <span className="nav__text">Requests</span>
            </a>
          </li>

          {role === "admin" && (
            <li onClick={() => handleMenu(false)}>
              <a href="#Users">
                <i className="fa fa-users fa-2x"></i>
                <span className="nav__text">Users</span>
              </a>
            </li>
          )}
          <li onClick={() => handleMenu(false)}>
            <a href="#History">
              <i className="fa fa-tasks fa-2x"></i>
              <span className="nav__text">History</span>
            </a>
          </li>
        </ul>
        <ul className="logout">
          <li>
            <a href="#" onClick={handleLogout}>
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav__text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashboardMenu;
