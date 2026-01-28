import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from './Services/EmployeeService';
import './admindashboard.css';

const ViewEmployeeComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const loadEmployee = useCallback(() => {
        setIsLoading(true);
        EmployeeService.getEmployeeById(id)
            .then(res => {
                setEmployee(res.data);
            })
            .catch(err => {
                toast.error('Failed to load user details', { position: 'top-center' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        loadEmployee();
    }, [loadEmployee]);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
            EmployeeService.deleteEmployee(id)
                .then(() => {
                    toast.success('User deleted successfully', { position: 'top-center' });
                    setTimeout(() => {
                        navigate('/admindashb');
                    }, 1500);
                })
                .catch(() => {
                    toast.error('Failed to delete user', { position: 'top-center' });
                });
        }
    };

    const goBack = () => {
        navigate('/admindashb');
    };

    if (isLoading) {
        return (
            <div className="admin-page">
                <div className="admin-container">
                    <div className="admin-loading">
                        <div className="admin-spinner"></div>
                        <span>Loading user details...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <ToastContainer />
            <div className="admin-container">
                {/* Breadcrumb */}
                <nav className="admin-breadcrumb">
                    <Link to="/admindashb">Users</Link>
                    <span>›</span>
                    <span className="admin-breadcrumb-current">{employee.firstName} {employee.lastName}</span>
                </nav>

                {/* Detail Card */}
                <div className="admin-detail-card">
                    <div className="admin-detail-header">
                        <div className="admin-detail-avatar">
                            {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
                        </div>
                        <h2 className="admin-detail-name">
                            {employee.firstName} {employee.lastName}
                        </h2>
                        <span className="status-badge active" style={{ marginTop: '0.75rem' }}>Active</span>
                    </div>

                    <div className="admin-detail-body">
                        <div className="admin-detail-row">
                            <span className="admin-detail-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                First Name
                            </span>
                            <span className="admin-detail-value">{employee.firstName || '—'}</span>
                        </div>

                        <div className="admin-detail-row">
                            <span className="admin-detail-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Last Name
                            </span>
                            <span className="admin-detail-value">{employee.lastName || '—'}</span>
                        </div>

                        <div className="admin-detail-row">
                            <span className="admin-detail-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}>
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                Email Address
                            </span>
                            <span className="admin-detail-value">{employee.emailId || '—'}</span>
                        </div>

                        <div className="admin-detail-row">
                            <span className="admin-detail-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                User ID
                            </span>
                            <span className="admin-detail-value">#{employee.id || '—'}</span>
                        </div>
                    </div>

                    <div className="admin-detail-actions">
                        <button
                            className="admin-btn admin-btn-secondary"
                            onClick={goBack}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to List
                        </button>
                        <button
                            className="admin-btn admin-btn-danger"
                            onClick={handleDelete}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Delete User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeComponent;
