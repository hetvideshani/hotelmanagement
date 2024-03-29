import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const AdminRooms = () => {
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState([]);

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        setUser(userEmail);
        console.log(user);
        fetch("http://localhost:5555/getAllRoom", {
            method: "GET"
        }).then(res => res.json()).then(res => setRoom(res));
    }, []);

    useEffect(() => {
        console.log(room);
    }, [room]);

    const displayRoom = room.map((room) => {
        return (
            <>
                <tr className='h-[50px]'>
                    <th>1</th>
                    <th>{room.category}</th>
                    <th>{room.prize}</th>
                    <th>{room.rating}</th>
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
                                <th>Category</th>
                                <th>prize</th>
                                <th>rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayRoom}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminRooms