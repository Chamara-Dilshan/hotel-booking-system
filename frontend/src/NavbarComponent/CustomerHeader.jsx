import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/authStore";
import "./RoleNav.css";

const CustomerHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const userLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    logout();
    navigate("/");
    window.location.reload(true);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="user/hotel/bookings" className="nav-link">
          My Bookings
        </Link>
      </li>

      <li className="nav-item">
        <button
          className="role-nav-logout"
          onClick={userLogout}
        >
          Logout
        </button>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default CustomerHeader;
