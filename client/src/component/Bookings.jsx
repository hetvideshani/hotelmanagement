import React, { useEffect, useState } from 'react';
import Header from "./header";

const Bookings = () => {
    let [user, setUser] = useState(null);
    let [booking, setBooking] = useState([]);

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        setUser(userEmail);
        fetch("http://localhost:5555/booking/" + userEmail, {
            method: "GET"
        }).then(res => res.json()).then(res => setBooking(res));
    }, []);

    useEffect(() => {
        console.log(booking);
    }, [booking]);

    const displayBooking = booking.map((book) => {
        return (<>
            <div className="w-1/5 h-fit bg-white float-start m-5">

                <div className="m-2 h-28">
                    <div className="w-full h-9">
                        <div className="float-start text-xl">
                            {book.email}
                        </div>
                        <div className="float-end">
                            {book.totalRooms} Room
                        </div>
                    </div>
                    <div className="w-full border-b-2 m-0 pb-2">
                        {book.members} Members
                    </div>
                </div>
            </div>
        </>)
    })

    return (
        <div>
            <Header />

            <div>
                <div className="bg-blue-200 w-screen h-auto pt-4">
                    <div className="h-16 flex justify-center ">
                        <div className="text-3xl h-3/5 flex justify-center items-center border-b-2 border-blue-950">
                            Bookings
                        </div>
                    </div>
                    <div className="ml-10 w-screen">
                        {displayBooking}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
