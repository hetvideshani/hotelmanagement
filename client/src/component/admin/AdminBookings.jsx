import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

const AdminBookings = () => {
    const [user, setUser] = useState(null);
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        setUser(userEmail);
        console.log(user);
        fetch("http://localhost:5555/getAllBooking", {
            method: "GET"
        }).then(res => res.json()).then(res => setBooking(res));
    }, []);

    useEffect(() => {
        console.log(booking);
    }, [booking]);

    const displayBooking = booking.map((book) => {
        return (
            <>
                <tr className='h-[50px]'>
                    <th>1</th>
                    <th>{book.name}</th>
                    <th>{book.email}</th>
                    <th>{book.contactNo}</th>
                    <th>{book.totalRooms}</th>
                    <th>{book.members}</th>
                    <th>{book.payment}</th>
                    <th>{book.checkin}</th>
                    <th>{book.checkout}</th>
                    <th><button className='bg-slate-700 text-white p-2'>Edit</button><button className='bg-red-600 text-white p-2 ml-2 rounded-lg'>Delete</button></th>
                </tr>
            </>
        )
    })

    return (
        <div>
            <Navbar />
            <div className='float-left'>
                <div className='text-dark w-full h-full overflow-auto'>
                    <table className='h-full w-[85.1vw] border-2 border-black'>
                        <thead>
                            <tr>
                                <th>Sr. NO</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>ContactNo</th>
                                <th>TotalRooms</th>
                                <th>Members</th>
                                <th>Payment</th>
                                <th>Checkin</th>
                                <th>Checkout</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayBooking}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default AdminBookings