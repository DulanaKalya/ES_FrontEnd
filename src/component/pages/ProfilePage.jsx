import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/profile.css';
import Pagination from "../common/pagination";

const ProfilePage = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();


    useEffect(() => {
        fetchUserInfo();
    }, []);
    
    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            setUserInfo(response.user);
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch user info');
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? '/edit-address' : '/add-address');
    }

    const bookEventList = userInfo.bookEventList || [];

    const totalPages = Math.ceil(bookEventList.length / itemsPerPage);

    const paginatedOrders = bookEventList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h2>Welcome {userInfo.name}</h2>
            </div>

            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="profile-content">
                    <div className="profile-sidebar">
                        <div className="profile-info-section">
                            <h3>Personal Information</h3>
                            <p><strong>Name: </strong>{userInfo.name}</p>
                            <p><strong>Email: </strong>{userInfo.email}</p>
                            <p><strong>Phone Number: </strong>{userInfo.phoneNumber}</p>
                        </div>

                        <div className="profile-info-section">
                            <h3>Address</h3>
                            {userInfo.address ? (
                                <div>
                                    <p><strong>Street: </strong>{userInfo.address.street}</p>
                                    <p><strong>City: </strong>{userInfo.address.city}</p>
                                    <p><strong>State: </strong>{userInfo.address.state}</p>
                                    <p><strong>Zip Code: </strong>{userInfo.address.zipCode}</p>
                                    <p><strong>Country: </strong>{userInfo.address.country}</p>
                                </div>
                            ) : (
                                <p>No address information available</p>
                            )}
                            <button className="profile-button" onClick={handleAddressClick}>
                                {userInfo.address ? "Edit Address" : "Add Address"}
                            </button>
                        </div>
                    </div>
                    
                    <div className="profile-main">
                        <h3>Purchase History</h3>
                        {paginatedOrders.length > 0 ? (
                            <>
                                <ul>
                                    {paginatedOrders.map(purchase => (
                                        <li key={purchase.id}>
                                            <img src={purchase.event?.imageUrl} alt={purchase.event?.name} />
                                            <div>
                                                <p><strong>Name: </strong>{purchase.event?.name}</p>
                                                <p><strong>Status: </strong>{purchase.status}</p>
                                                <p><strong>Quantity: </strong>{purchase.quantity}</p>
                                                <p><strong>Price: </strong>${purchase.price.toFixed(2)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </>
                        ) : (
                            <div className="purchase-empty">
                                <p>You haven't made any purchases yet</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;