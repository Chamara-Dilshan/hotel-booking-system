import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import "./ViewMyHotelBookings.css";

const ViewMyHotelBookings = () => {
  const { user } = useAuthStore();

  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "bookingId", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const getAllBooking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/book/hotel/fetch/bookings?hotelId=${user.hotelId}`
        );
        if (response.data?.bookings) {
          setAllBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    getAllBooking();
  }, [user.hotelId]);

  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("confirm")) return "confirmed";
    if (statusLower.includes("pending")) return "pending";
    if (statusLower.includes("cancel")) return "cancelled";
    if (statusLower.includes("complete")) return "completed";
    return "";
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const response = await fetch("http://localhost:8080/api/book/hotel/update/status", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, bookingStatus: newStatus }),
      });

      const result = await response.json();
      if (result.bookings) {
        setAllBookings(result.bookings);
        toast.success(`Booking status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update booking status");
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const stats = useMemo(() => {
    const total = allBookings.length;
    const pending = allBookings.filter((b) => getStatusClass(b.status) === "pending").length;
    const confirmed = allBookings.filter((b) => getStatusClass(b.status) === "confirmed").length;
    const totalRevenue = allBookings
      .filter((b) => getStatusClass(b.status) !== "cancelled")
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return { total, pending, confirmed, totalRevenue };
  }, [allBookings]);

  const filteredAndSortedBookings = useMemo(() => {
    let filtered = [...allBookings];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.customerName?.toLowerCase().includes(term) ||
          booking.bookingId?.toString().includes(term) ||
          booking.hotelName?.toLowerCase().includes(term) ||
          booking.customerContact?.includes(term)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => getStatusClass(booking.status) === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "totalAmount") {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else if (typeof aVal === "string") {
        aVal = aVal?.toLowerCase() || "";
        bVal = bVal?.toLowerCase() || "";
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [allBookings, searchTerm, statusFilter, sortConfig]);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBookings.slice(start, start + itemsPerPage);
  }, [filteredAndSortedBookings, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedBookings.length / itemsPerPage);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const SortIcon = ({ columnKey }) => (
    <span className={`sort-icon ${sortConfig.key === columnKey ? "active" : ""}`}>
      {sortConfig.key === columnKey ? (sortConfig.direction === "asc" ? "\u2191" : "\u2193") : "\u2195"}
    </span>
  );

  return (
    <div className="hotel-bookings-container">
      <div className="hotel-bookings-wrapper">
        {/* Header */}
        <div className="hotel-bookings-header">
          <h1>Hotel Bookings</h1>
          <p>Manage and track all reservations for your hotel</p>
        </div>

        {/* Stats Cards */}
        <div className="bookings-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon confirmed">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.confirmed}</span>
              <span className="stat-label">Confirmed</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">LKR {stats.totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Total Revenue</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bookings-toolbar">
          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by guest name, booking ID, or contact..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="filters-group">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

            {(searchTerm || statusFilter !== "all") && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bookings-table-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading bookings...</p>
            </div>
          ) : paginatedBookings.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <h3>No Bookings Found</h3>
              <p>
                {searchTerm || statusFilter !== "all"
                  ? "No bookings match your current filters. Try adjusting your search criteria."
                  : "You don't have any bookings yet. They will appear here once customers make reservations."}
              </p>
            </div>
          ) : (
            <>
              <div className="bookings-table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Hotel</th>
                      <th onClick={() => handleSort("bookingId")}>
                        Booking ID <SortIcon columnKey="bookingId" />
                      </th>
                      <th onClick={() => handleSort("customerName")}>
                        Guest <SortIcon columnKey="customerName" />
                      </th>
                      <th onClick={() => handleSort("checkIn")}>
                        Check-in <SortIcon columnKey="checkIn" />
                      </th>
                      <th onClick={() => handleSort("checkOut")}>
                        Check-out <SortIcon columnKey="checkOut" />
                      </th>
                      <th>Rooms</th>
                      <th>Days</th>
                      <th onClick={() => handleSort("totalAmount")}>
                        Amount <SortIcon columnKey="totalAmount" />
                      </th>
                      <th onClick={() => handleSort("status")}>
                        Status <SortIcon columnKey="status" />
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.map((booking) => (
                      <tr key={booking.bookingId || booking.id}>
                        <td>
                          <div className="hotel-info">
                            <img
                              src={`http://localhost:8080/api/hotel/${booking.hotelImage}`}
                              className="hotel-thumbnail"
                              alt={booking.hotelName}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/48x48?text=Hotel";
                              }}
                            />
                            <div className="hotel-details">
                              <span className="hotel-name">{booking.hotelName}</span>
                              <span className="hotel-email">{booking.hotelEmail}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <strong>#{booking.bookingId}</strong>
                        </td>
                        <td>
                          <div className="customer-info">
                            <span className="customer-name">{booking.customerName}</span>
                            <span className="customer-contact">{booking.customerContact}</span>
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            <span className="date-value">{booking.checkIn}</span>
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            <span className="date-value">{booking.checkOut}</span>
                          </div>
                        </td>
                        <td>{booking.totalRoom}</td>
                        <td>{booking.totalDay}</td>
                        <td className="amount-cell">LKR {booking.totalAmount?.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(booking.status)}`}>
                            <span className="status-dot"></span>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div className="actions-cell">
                            <Link
                              to={`/hotel/verify/booking/${booking.id}`}
                              className="action-btn view"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              View
                            </Link>
                            {getStatusClass(booking.status) === "pending" && (
                              <>
                                <button
                                  className="action-btn confirm"
                                  onClick={() => handleStatusUpdate(booking.bookingId, "Confirmed")}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                  Confirm
                                </button>
                                <button
                                  className="action-btn cancel"
                                  onClick={() => handleStatusUpdate(booking.bookingId, "Cancelled")}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                  </svg>
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                  <strong>{Math.min(currentPage * itemsPerPage, filteredAndSortedBookings.length)}</strong> of{" "}
                  <strong>{filteredAndSortedBookings.length}</strong> bookings
                </div>

                <div className="pagination-controls">
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    &laquo;
                  </button>
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    &lsaquo;
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    &rsaquo;
                  </button>
                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    &raquo;
                  </button>

                  <select
                    className="page-size-select"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={10}>10 / page</option>
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMyHotelBookings;
