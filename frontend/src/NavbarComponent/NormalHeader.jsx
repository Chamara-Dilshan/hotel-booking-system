import { Link } from "react-router-dom";
import "./RoleNav.css";

const NormalHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/user/customer/register" className="nav-link role-nav-register">
          Register
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/login" className="role-nav-login">
          Login
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
