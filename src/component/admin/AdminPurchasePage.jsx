//import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/admin.css';
import Pagination from "../common/pagination";
import ApiService from "../../service/ApiService";
import React, { useState, useEffect, useCallback } from "react";


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
    const [searchStatus, setSearchStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
    fetchPurchases();
}, [fetchPurchases]); // ✅ Now safe


    useEffect(() => {
    fetchPurchases();
}, [fetchPurchases]); // ✅ Now safe


    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setStatusFilter(filterValue);
        setCurrentPage(1);

        if (filterValue) {
            const filtered = purchases.filter(purchase => purchase.status === filterValue);
            setFilteredPurchases(filtered.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        } else {
            setFilteredPurchases(purchases.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(purchases.length / itemsPerPage));
        }
    }

    const handleSearchStatusChange = async (e) => {
        setSearchStatus(e.target.value);
        setCurrentPage(1);
    }

    const handlePurchaseDetails = (id) => {
        navigate(`/admin/purchase-details/${id}`);
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Purchase Management</h1>
                <p className="admin-subtitle">Track and manage all customer purchases</p>
            </div>
            
            {error && (
                <div className="error-message" style={{padding: '1rem', marginBottom: '1rem'}}>
                    {error}
                </div>
            )}
            
            <div className="admin-list">
                <div className="filter-controls" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    <div className="filter-group" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        minWidth: '200px'
                    }}>
                        <label htmlFor="statusFilter" style={{marginBottom: '0.5rem', fontWeight: '500'}}>
                            Filter By Status
                        </label>
                        <select 
                            id="statusFilter"
                            value={statusFilter} 
                            onChange={handleFilterChange}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(5px)'
                            }}
                        >
                            <option value="">All Statuses</option>
                            {PurchaseStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-group" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        minWidth: '200px'
                    }}>
                        <label htmlFor="searchStatus" style={{marginBottom: '0.5rem', fontWeight: '500'}}>
                            Search By Status
                        </label>
                        <select 
                            id="searchStatus"
                            value={searchStatus} 
                            onChange={handleSearchStatusChange}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(5px)'
                            }}
                        >
                            <option value="">All Statuses</option>
                            {PurchaseStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {loading ? (
                    <p className="loading-message">Loading purchases...</p>
                ) : filteredPurchases.length === 0 ? (
                    <p className="empty-message">No purchases found matching the current filters.</p>
                ) : (
                    <>
                        <table className="admin-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead>
                                <tr>
                                    <th>Purchase ID</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPurchases.map((purchase, index) => (
                                    <tr 
                                        key={purchase.id}
                                        className="fade-in"
                                        style={{animationDelay: `${index * 0.05}s`}}
                                    >
                                        <td>#{purchase.id}</td>
                                        <td>{purchase.user.name}</td>
                                        <td>
                                            <span className={`status-badge ${getPurchaseStatusClass(purchase.status)}`}
                                                style={{
                                                    padding: '0.3rem 0.6rem',
                                                    borderRadius: 'var(--border-radius-sm)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '500',
                                                    display: 'inline-block',
                                                    background: purchase.status === 'DELIVERED' ? 'rgba(34, 197, 94, 0.2)' :
                                                              purchase.status === 'CANCELLED' ? 'rgba(239, 68, 68, 0.2)' :
                                                              purchase.status === 'PENDING' ? 'rgba(234, 179, 8, 0.2)' :
                                                              'rgba(124, 58, 237, 0.2)',
                                                    color: purchase.status === 'DELIVERED' ? 'var(--success-color)' :
                                                           purchase.status === 'CANCELLED' ? 'var(--error-color)' :
                                                           purchase.status === 'PENDING' ? '#B45309' :
                                                           'var(--primary-color)'
                                                }}
                                            >
                                                {purchase.status}
                                            </span>
                                        </td>
                                        <td>${purchase.price.toFixed(2)}</td>
                                        <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button 
                                                className="admin-btn-edit"
                                                onClick={() => handlePurchaseDetails(purchase.id)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div style={{marginTop: '2rem'}}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default AdminPurchasesPage;