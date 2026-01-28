import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from './Services/EmployeeService';
import './admindashboard.css';

const CreateEmployeeComponent = () => {
  useParams(); // Reserved for edit functionality
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!emailId.trim()) {
      newErrors.emailId = 'Email is required';
    } else if (!validateEmail(emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below', { position: 'top-center' });
      return;
    }

    setIsLoading(true);
    const employee = { firstName, lastName, emailId };

    try {
      await EmployeeService.createEmployee(employee);
      toast.success('User created successfully!', { position: 'top-center' });
      
      setTimeout(() => {
        navigate('/admindashb');
      }, 1500);
    } catch (error) {
      toast.error('Failed to create user. Please try again.', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'emailId':
        setEmailId(value);
        break;
      default:
        break;
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const cancel = () => {
    navigate('/admindashb');
  };

  return (
    <div className="admin-page">
      <ToastContainer />
      <div className="admin-container">
        {/* Breadcrumb */}
        <nav className="admin-breadcrumb">
          <Link to="/admindashb">Users</Link>
          <span>›</span>
          <span className="admin-breadcrumb-current">Add New User</span>
        </nav>

        {/* Form Card */}
        <div className="admin-form-card">
          <div className="admin-form-header">
            <h2>Add New User</h2>
            <p>Fill in the details to create a new user account</p>
          </div>
          
          <div className="admin-form-body">
            <form onSubmit={saveEmployee}>
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="firstName">
                  First Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`admin-form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="admin-form-error">{errors.firstName}</p>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="lastName">
                  Last Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`admin-form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="admin-form-error">{errors.lastName}</p>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="emailId">
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  id="emailId"
                  className={`admin-form-control ${errors.emailId ? 'is-invalid' : ''}`}
                  placeholder="name@example.com"
                  value={emailId}
                  onChange={(e) => handleInputChange('emailId', e.target.value)}
                  disabled={isLoading}
                />
                {errors.emailId && (
                  <p className="admin-form-error">{errors.emailId}</p>
                )}
              </div>

              <div className="admin-form-actions">
                <button
                  type="submit"
                  className="admin-btn admin-btn-success"
                  disabled={isLoading}
                  style={{ flex: 1 }}
                >
                  {isLoading ? (
                    <>
                      <span className="admin-spinner" style={{ width: '18px', height: '18px', marginRight: '0.5rem' }}></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save User
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={cancel}
                  disabled={isLoading}
                  style={{ flex: 1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
