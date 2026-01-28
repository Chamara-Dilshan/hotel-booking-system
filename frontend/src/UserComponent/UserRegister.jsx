import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf("admin") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "Admin" }));
    } else if (location.pathname.indexOf("hotel") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "Hotel" }));
    } else if (location.pathname.indexOf("customer") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "Customer" }));
    }
  }, [location.pathname]);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/user/gender");
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();

    const monthDifference = currentDate.getMonth() - selectedDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < selectedDate.getDate())
    ) {
      age--;
    }

    setUser({ ...user, age });
  };

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const saveUser = (event) => {
    event.preventDefault();

    if (alreadyRegistered) {
      toast.error("Already saved.");
      return;
    }

    if (validateFields()) {
      setSubmitDisabled(true);

      fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((result) => {
          toast.success("Registered Successfully!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          result
            .json()
            .then((res) => {
              console.log("response", res);
              setRegistrationSuccess(true);
              setAlreadyRegistered(true);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setSubmitDisabled(false);
            });
        });
    }
  };

  const validateFields = () => {
    if (
      user.firstName.trim() === "" ||
      user.lastName.trim() === "" ||
      user.emailId.trim() === "" ||
      user.password.trim() === "" ||
      user.contact.trim() === "" ||
      user.street.trim() === "" ||
      user.city.trim() === "" ||
      user.pincode.trim() === "" ||
      user.sex === "0"
    ) {
      toast.error("Please fill all the empty fields.");
      return false;
    }

    if (user.password.length < 4) {
      toast.error("Password should contain at least 4 characters.");
      return false;
    }

    return true;
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container register-container">
        {registrationSuccess && (
          <div className="alert alert-success text-center mb-4">
            ✓ Profile has been created successfully. Please log in.
          </div>
        )}
        
        <div className="auth-card register-card">
          <div className="add-hotel-header" style={{ textAlign: 'center' }}>
            <h5 style={{ margin: 0, fontWeight: 700, color: '#F8FAFC', textAlign: 'center' }}>
              {location.pathname.includes('/admin') ? 'Register Hotel Admin' :
               location.pathname.includes('/customer') ? 'Register New Customer' :
               'Register Hotel'}
            </h5>
          </div>

          <form className="auth-form register-form" onSubmit={saveUser}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  onChange={handleUserInput}
                  value={user.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  onChange={handleUserInput}
                  value={user.lastName}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emailId" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  placeholder="john@example.com"
                  onChange={handleUserInput}
                  value={user.emailId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="At least 4 characters"
                  onChange={handleUserInput}
                  value={user.password}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sex" className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="sex"
                  id="sex"
                  onChange={handleUserInput}
                  value={user.sex}
                >
                  <option value="0">Select Gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="contact" className="form-label">Contact Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="contact"
                  name="contact"
                  placeholder="+94 77 123 4567"
                  onChange={handleUserInput}
                  value={user.contact}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  onChange={(e) => calculateAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Colombo"
                  onChange={handleUserInput}
                  value={user.city}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street" className="form-label">Street Address</label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  rows="2"
                  placeholder="123 Main Street"
                  onChange={handleUserInput}
                  value={user.street}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode" className="form-label">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  placeholder="10100"
                  onChange={handleUserInput}
                  value={user.pincode}
                />
              </div>
            </div>

            <div className="auth-actions">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={submitDisabled}
              >
                {submitDisabled ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserRegister;
