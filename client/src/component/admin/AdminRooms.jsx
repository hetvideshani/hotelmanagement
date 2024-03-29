import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

const AdminRooms = () => {
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState([]);

    const navigate = useNavigate();

    const deleteroom = async (id) => {
        console.log(id);
        await fetch("http://localhost:5555/deleteroom/" + id, {
            method: "DELETE"
        }).then(res => res.json()).then(res => setRoom(res));
    }

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

    const displayRoom = room.map((r) => {
        return (
            <>
                <tr className='h-[50px]'>
                    <th>{room.indexOf(r) + 1}</th>
                    <th>{r.category}</th>
                    <th>{r.prize}</th>
                    <th>{r.rating}</th>
                    <th>
                        <button className='bg-slate-700 text-white p-2' onClick={() => {
                            navigate('/roomedit/' + r._id)
                        }}>Edit</button>
                        <button className='bg-red-600 text-white p-2 ml-2 rounded-lg' onClick={() => {
                            deleteroom(r._id)
                        }}>Delete</button>
                    </th>
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