import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import EventList from "../common/EventList";
import Pagination from "../common/pagination";
import ApiService from "../../service/ApiService";
import '../../style/home.css';


const Home = () => {
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 5;

    useEffect(()=> {

        const fetchEvents = async () => {
            try{
                let allEvents = [];
                const queryparams = new URLSearchParams(location.search);
                const searchItem = queryparams.get('search')

                if (searchItem) {
                    const response = await ApiService.searchEvents(searchItem);
                    allEvents = response.eventList || [];
                }else{
                    const response = await ApiService.getAllEvents();
                    allEvents = response.eventList || [];

                }

                setTotalPages(Math.ceil(allEvents.length/itemsPerPage));
                setEvents(allEvents.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage));

            }catch(error){
                setError(error.response?.data?.message || error.message || 'unable to fetch events');
            }
        };
        
        fetchEvents();
    }, [location.search, currentPage]);    return(
        <div className="home">
            <div className="pattern-overlay dot-pattern"></div>
            <div className="home-decoration"></div>
            <div className="floating-circle floating-circle-1"></div>
            <div className="floating-circle floating-circle-2"></div>
            <div className="floating-circle floating-circle-3"></div>
            <div className="home-header">
                <h1>Discover Amazing Events</h1>
                <p>Find and book the most exciting events happening around you</p>
            </div>
            
            {error ? (
                <p className="error-message">{error}</p>
            ):(
                <div className="content-wrapper">
                    {events && events.length > 0 ? (
                        <>
                            <EventList events={events}/>
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page)=> setCurrentPage(page)}
                            />
                        </>
                    ) : (
                        <div className="empty-state">
                            <h3>No events found</h3>
                            <p>Try searching for something different</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )


}

export default Home;