import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const AdminUser = () => {
    const [user, setUser] = useState(null);
    const [allUser, setAllUser] = useState([]);

    const deleteuser = async (id) => {
        const res = await fetch("http://localhost:5555/getalluser" + id, {
            method: "DELETE"
        });
    }

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        setUser(userEmail);
        console.log(user);
        fetch("http://localhost:5555/getalluser", {
            method: "GET"
        }).then(res => res.json()).then(res => setAllUser(res));
    }, []);

    useEffect(() => {
        console.log(allUser);
    }, [allUser]);

    const displayUser = allUser.map((insan) => {
        return (
            <>
                <tr className='h-[50px]'>
                    <th>1</th>
                    <th>{insan.name}</th>
                    <th>{insan.emailID}</th>
                    <th>{insan.contactNo}</th>
                    <th><button className='bg-slate-700 text-white p-2'>Edit</button><button className='bg-red-600 text-white p-2 ml-2 rounded-lg'>Delete</button></th>
                </tr>
            </>
        )
    })

    return (
        <div>
            <div>
                <Navbar />
                <div className='float-left'>
                    <div className='text-dark w-full h-full overflow-auto'>
                        <table className='h-full w-[85.1vw] border-2 border-black'>
                            <thead>
                                <tr>
                                    <th>Sr. NO</th>
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>Contact No.</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayUser}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUser