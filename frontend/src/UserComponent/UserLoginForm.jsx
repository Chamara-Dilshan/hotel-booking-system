import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./UserAuth.css";

const UserLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const forgetpassword = (e) => {
    navigate("/forgetP");
  };

  const loginAction = (e) => {
    e.preventDefault();

    // Check if user role is selected
    if (!loginRequest.role) {
      toast.error("Please select a user role", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Check for empty fields after clicking login
    if (!loginRequest.emailId || !loginRequest.password) {
      toast.error("Please fill all the required fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.role === "Admin" || res.role === "Customer" || res.role === "Hotel") {
          login(res);
        } else {
          alert("Please enter the correct Email or Password");
          return;
        }
        
        toast.success("logged in successfully!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        navigate("/");
        window.location.reload(true);
      });
    });
  };

  // Function to check if a field is empty
  const isFieldEmpty = (fieldName) => {
    return loginRequest[fieldName] === "";
  };

  const [loginActionClicked, setLoginActionClicked] = useState(false);

  const handleLoginButtonClick = (e) => {
    e.preventDefault();
    setLoginActionClicked(true);
    loginAction(e);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="add-hotel-header">
            <h5 style={{ margin: 0, fontWeight: 700, color: '#F8FAFC', textAlign: 'center' }}>
              Log In
            </h5>
            <p className="auth-subtitle" style={{ textAlign: 'center' }}>Sign in to your account</p>
          </div>

          <form className="auth-form" onSubmit={handleLoginButtonClick}>
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                User Role
              </label>
              <select
                onChange={handleUserInput}
                className={`form-select ${isFieldEmpty("role") && loginActionClicked ? "is-invalid" : ""}`}
                name="role"
                id="role"
              >
                <option value="">Select your role</option>
                <option value="Admin">Super Admin</option>
                <option value="Customer">Customer</option>
                <option value="Hotel">Hotel Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="emailId" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${isFieldEmpty("emailId") && loginActionClicked ? "is-invalid" : ""}`}
                id="emailId"
                name="emailId"
                placeholder="name@example.com"
                onChange={handleUserInput}
                value={loginRequest.emailId}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${isFieldEmpty("password") && loginActionClicked ? "is-invalid" : ""}`}
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleUserInput}
                value={loginRequest.password}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="auth-actions">
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
              <button 
                type="button" 
                className="btn btn-link"
                onClick={forgetpassword}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserLoginForm;
