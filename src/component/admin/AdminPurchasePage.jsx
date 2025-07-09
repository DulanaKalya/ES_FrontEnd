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
    const [searchStatus, setSearchStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    // ✅ define fetchPurchases BEFORE useEffect
    const fetchPurchases = useCallback(async () => {
        setLoading(true);
        try {
            const response = await ApiService.getAllPurchases(); // modify to match your actual API method
            const all = response.data || [];

            setPurchases(all);
            const filtered = statusFilter ? all.filter(p => p.status === statusFilter) : all;
            setFilteredPurchases(filtered.slice(0, itemsPerPage));
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

    const handleSearchStatusChange = async (e) => {
        setSearchStatus(e.target.value);
        setCurrentPage(1);
    };

    const handlePurchaseDetails = (id) => {
        navigate(`/admin/purchase-details/${id}`);
    };

    return (
        <div className="admin-container">
            {/* ... (same JSX as your original post) */}
        </div>
    );
};

export default AdminPurchasesPage;
