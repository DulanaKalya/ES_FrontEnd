import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/admin.css';

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async() => {
        setLoading(true);
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
            setError(null);
        } catch (error) {
            setError("Error fetching category list. Please try again.");
            console.log("Error fetching category list", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/edit-category/${id}`);
    }
    
    const handleDelete = async(id) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if(confirmed) {
            try {
                await ApiService.deleteCategory(id);
                fetchCategories();
            } catch (error) {
                setError("Error deleting category. Please try again.");
                console.log("Error deleting category by id", error);
            }
        }
    }

    return(
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Category Management</h1>
                <p className="admin-subtitle">Organize your events by creating and managing categories</p>
            </div>
            
            {error && (
                <div className="error-message" style={{padding: '1rem', marginBottom: '1rem'}}>
                    {error}
                </div>
            )}
            
            <div className="admin-list">
                <div className="admin-list-header">
                    <h2 className="admin-list-title">Categories</h2>
                    <div className="admin-list-actions">
                        <button 
                            className="admin-btn"
                            onClick={() => navigate('/admin/add-category')}
                        >
                            Add New Category
                        </button>
                    </div>
                </div>
                
                {loading ? (
                    <p className="loading-message">Loading categories...</p>
                ) : categories.length === 0 ? (
                    <p className="empty-message">No categories found. Create your first category!</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr 
                                    key={category.id} 
                                    className="fade-in"
                                    style={{animationDelay: `${index * 0.05}s`}}
                                >
                                    <td>{category.name}</td>
                                    <td className="admin-action-btns">
                                        <button 
                                            className="admin-btn-edit"
                                            onClick={() => handleEdit(category.id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="admin-btn-delete"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminCategoryPage;