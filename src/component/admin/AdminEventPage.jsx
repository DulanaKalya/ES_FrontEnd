//import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/admin.css';
import Pagination from "../common/pagination";
import ApiService from "../../service/ApiService";
import React, { useState, useEffect, useCallback } from "react";


const AdminEventPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;


    const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
        const response = await ApiService.getAllEvents();
        const eventList = response.eventList || [];
        setTotalPages(Math.ceil(eventList.length / itemsPerPage));
        setEvents(eventList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        setError(null);
    } catch (error) {
        setError(error.response?.data?.message || error.message || 'Unable to fetch events');
    } finally {
        setLoading(false);
    }
}, [currentPage, itemsPerPage]); // ✅ include all used state values


    useEffect(() => {
    fetchEvents();
}, [fetchEvents]); // ✅ Correct


    const handleEdit = (id) => {
        navigate(`/admin/edit-event/${id}`);
    }
    
    const handleDelete = async(id) => {
        const confirmed = window.confirm("Are you sure you want to delete this event?");
        if(confirmed){
            try {
                await ApiService.deleteEvent(id);
                fetchEvents();
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to delete event');
            }
        }
    }

    return(
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Event Management</h1>
                <p className="admin-subtitle">Create, edit, and manage your events in one place</p>
            </div>
            
            {error ? (
                <div className="error-message" style={{padding: '1rem', marginBottom: '1rem'}}>
                    {error}
                </div>
            ) : (
                <div className="admin-list">
                    <div className="admin-list-header">
                        <h2 className="admin-list-title">Events</h2>
                        <div className="admin-list-actions">
                            <button 
                                className="admin-btn"
                                onClick={() => navigate('/admin/add-event')}
                            >
                                Add New Event
                            </button>
                        </div>
                    </div>
                    
                    {loading ? (
                        <p className="loading-message">Loading events...</p>
                    ) : events.length === 0 ? (
                        <p className="empty-message">No events found. Create your first event!</p>
                    ) : (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Event Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr key={event.id} className="fade-in">
                                            <td>{event.name}</td>
                                            <td className="admin-action-btns">
                                                <button 
                                                    className="admin-btn-edit"
                                                    onClick={() => handleEdit(event.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="admin-btn-delete"
                                                    onClick={() => handleDelete(event.id)}
                                                >
                                                    Delete
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
            )}
        </div>
    );
}
export default AdminEventPage;