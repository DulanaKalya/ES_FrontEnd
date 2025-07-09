import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/admin.css';
import Pagination from "../common/pagination";
import ApiService from "../../service/ApiService";

const PurchaseStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

const getPurchaseStatusClass = (status) => {
    switch(status) {
        case 'PENDING': return 'status-pending';
        case 'CONFIRMED': return 'status-confirmed';
        case 'SHIPPED': return 'status-shipped';
        case 'DELIVERED': return 'status-delivered';
        case 'CANCELLED': return 'status-cancelled';
        case 'RETURNED': return 'status-returned';
        default: return '';
    }
};

const AdminPurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    const fetchPurchases = useCallback(async () => {
        setLoading(true);
        try {
            const response = await ApiService.getAllPurchases();
            const all = response.data || [];

            setPurchases(all);
            const filtered = statusFilter ? all.filter(p => p.status === statusFilter) : all;
            const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
            setFilteredPurchases(paginated);
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
            setError(null);
        } catch (err) {
            setError("Failed to fetch purchases.");
        }
        setLoading(false);
    }, [statusFilter, currentPage]);

    useEffect(() => {
        fetchPurchases();
    }, [fetchPurchases]);

    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setStatusFilter(filterValue);
        setCurrentPage(1);
    };

    const handlePurchaseDetails = (id) => {
        navigate(`/admin/purchase-details/${id}`);
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Purchase Management</h1>
                <p className="admin-subtitle">Track and manage all customer purchases</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="filter-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label htmlFor="statusFilter">Filter By Status:</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={handleFilterChange}
                        style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
                    >
                        <option value="">All</option>
                        {PurchaseStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading purchases...</p>
            ) : filteredPurchases.length === 0 ? (
                <p>No purchases found.</p>
            ) : (
                <>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPurchases.map(purchase => (
                                <tr key={purchase.id}>
                                    <td>#{purchase.id}</td>
                                    <td>{purchase.user?.name || 'N/A'}</td>
                                    <td>
                                        <span className={`status-badge ${getPurchaseStatusClass(purchase.status)}`}>
                                            {purchase.status}
                                        </span>
                                    </td>
                                    <td>${purchase.price?.toFixed(2) || '0.00'}</td>
                                    <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handlePurchaseDetails(purchase.id)}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
        </div>
    );
};

export default AdminPurchasesPage;
