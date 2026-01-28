import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/authStore";
import "./RoleNav.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const adminLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 1000,
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
      {/* Dashboard Dropdown */}
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dashboard
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link to="/admindashb" className="dropdown-item">
              Admin Dashboard
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link to="user/admin/booking/all" className="dropdown-item">
              View All Bookings
            </Link>
          </li>
        </ul>
      </li>

      {/* Management Dropdown */}
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Manage
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link to="/admin/add-location" className="dropdown-item">
              Add Location
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link to="/admin/add-facility" className="dropdown-item">
              Add Facility
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link to="/user/admin/register" className="dropdown-item">
              Register Hotel Admin
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link to="/admin/hotel/register" className="dropdown-item">
              Add Hotel
            </Link>
          </li>
        </ul>
      </li>

      {/* Logout */}
      <li className="nav-item">
        <button
          className="role-nav-logout"
          onClick={adminLogout}
        >
          Logout
        </button>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
