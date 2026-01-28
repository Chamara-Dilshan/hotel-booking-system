import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from './Services/EmployeeService';
import Footer from '../Footer';
import './admindashboard.css';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const navigate = useNavigate();

    const filterEmployees = useCallback(() => {
        if (!searchTerm.trim()) {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(emp => 
                emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.emailId?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }
        setCurrentPage(1);
    }, [searchTerm, employees]);

    useEffect(() => {
        loadEmployees();
    }, []);

    useEffect(() => {
        filterEmployees();
    }, [filterEmployees]);

    const loadEmployees = () => {
        setIsLoading(true);
        EmployeeService.getEmployees()
            .then((res) => {
                setEmployees(res.data);
                setFilteredEmployees(res.data);
            })
            .catch((error) => {
                toast.error('Failed to load users', { position: 'top-center' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const deleteEmployee = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            EmployeeService.deleteEmployee(id)
                .then(() => {
                    setEmployees(employees.filter(employee => employee.id !== id));
                    toast.success('User deleted successfully', { position: 'top-center' });
                })
                .catch(() => {
                    toast.error('Failed to delete user', { position: 'top-center' });
                });
        }
    };

    const viewEmployee = (id) => {
        navigate(`/admindashb/view-employee/${id}`);
    };

    const addEmployee = () => {
        navigate('/admindashb/add-employee');
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Stats
    const totalUsers = employees.length;
    const recentUsers = employees.filter(emp => {
        const createdDate = new Date(emp.createdAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return createdDate >= thirtyDaysAgo;
    }).length;

    return (
        <div className="admin-page">
            <ToastContainer />
            <div className="admin-container">
                {/* Page Header */}
                <div className="admin-page-header">
                    <div>
                        <h1 className="admin-page-title">User Management</h1>
                        <p className="admin-page-subtitle">Manage all registered users in the system</p>
                    </div>
                    <button className="admin-btn admin-btn-primary" onClick={addEmployee}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add User
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <div className="stat-icon primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>{totalUsers}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>{recentUsers || 0}</h3>
                            <p>New This Month</p>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>{totalUsers}</h3>
                            <p>Active Users</p>
                        </div>
                    </div>
                </div>

                {/* Users Table Card */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2 className="admin-card-title">All Users</h2>
                        <div className="admin-toolbar">
                            <div className="admin-search">
                                <svg className="admin-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    className="admin-search-input"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="admin-loading">
                            <div className="admin-spinner"></div>
                            <span>Loading users...</span>
                        </div>
                    ) : filteredEmployees.length === 0 ? (
                        <div className="admin-empty-state">
                            <div className="admin-empty-icon">👤</div>
                            <h3>No users found</h3>
                            <p>{searchTerm ? 'Try a different search term' : 'Get started by adding your first user'}</p>
                            {!searchTerm && (
                                <button className="admin-btn admin-btn-primary" onClick={addEmployee}>
                                    Add User
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map(employee => (
                                            <tr key={employee.id}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                        <div style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, var(--primary-color) 0%, #0d3a57 100%)',
                                                            color: 'white',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: '600',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: '600' }}>{employee.firstName} {employee.lastName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{employee.emailId}</td>
                                                <td>
                                                    <span className="status-badge active">Active</span>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button
                                                            className="admin-btn admin-btn-secondary admin-btn-sm"
                                                            onClick={() => viewEmployee(employee.id)}
                                                            data-tooltip="View details"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                <circle cx="12" cy="12" r="3"></circle>
                                                            </svg>
                                                            View
                                                        </button>
                                                        <button
                                                            className="admin-btn admin-btn-danger admin-btn-sm"
                                                            onClick={() => deleteEmployee(employee.id, `${employee.firstName} ${employee.lastName}`)}
                                                            data-tooltip="Delete user"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="admin-pagination">
                                    <div className="pagination-info">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEmployees.length)} of {filteredEmployees.length} users
                                    </div>
                                    <div className="pagination-controls">
                                        <button
                                            className="pagination-btn"
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                                onClick={() => paginate(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            className="pagination-btn"
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ListEmployeeComponent;
