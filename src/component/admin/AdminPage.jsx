import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style/admin.css';

const AdminPage = () => {
    const navigate = useNavigate();

    return(
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Admin Dashboard</h1>
                <p className="admin-subtitle">Manage your events, categories, and track purchases all in one place.</p>
            </div>
            
            <div className="admin-menu">
                <div className="admin-card">
                    <h3>Categories</h3>
                    <p>Create, edit, or delete event categories</p>
                    <button className="admin-btn" onClick={() => navigate("/admin/categories")}>
                        Manage Categories
                    </button>
                </div>
                
                <div className="admin-card">
                    <h3>Events</h3>
                    <p>Add new events or modify existing ones</p>
                    <button className="admin-btn" onClick={() => navigate("/admin/events")}>
                        Manage Events
                    </button>
                </div>
                
                <div className="admin-card">
                    <h3>Purchases</h3>
                    <p>View and track all event purchases</p>
                    <button className="admin-btn" onClick={() => navigate("/admin/purchases")}>
                        Manage Purchases
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;