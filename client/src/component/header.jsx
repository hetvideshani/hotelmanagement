import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoMdHeart } from "react-icons/io";

const Header = memo(() => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(localStorage.getItem('email'));
    }, []);

    return (
        <>
            <div className="w-screen h-16 flex flex-row" style={{ backgroundColor: "#07122e" }}>
                <div className="text-white w-1/5 text-4xl ml-3 mt-2">
                    HMS
                </div>
                <div className="flex flex-row space-x-10 text-3xl ml-10">
                    <div className="text-white ml-3 mt-2" onClick={() => navigate('/')}>
                        Home
                    </div>
                    <div className="text-white ml-3 mt-2">
                        Rooms
                    </div>
                    <div className="text-white ml-3 mt-2" onClick={() => {
                        user ? navigate('/bookings') : Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Please signup to check bookings",
                        });
                    }}>
                        Bookings
                    </div>
                    <div className="text-white ml-3 mt-2">
                        About
                    </div>
                    <div className="text-white ml-3 mt-2">
                        Contact
                    </div>
                </div>
                <div className="flex flex-row-reverse mt-3 ml-32">
                    {user !== null ? <>
                        <button class="bg-white hover:bg-blue-700 h-9 text-black font-bold py-2 px-4 rounded" onClick={() => {
                            console.log(localStorage.getItem('email'))
                            setUser(null)
                            localStorage.removeItem('email');
                        }}>
                            LogOut
                        </button>
                    </> : <>
                        <button class="bg-white hover:bg-blue-700 h-9 text-black font-bold py-2 px-4 rounded" onClick={() => {
                            navigate('/signin');
                        }}>
                            Login
                        </button>
                    </>}

                    <IoMdHeart className='text-white h-10 w-8 mr-5' onClick={() => {
                        user ? navigate('/wishlist') : Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Please signup to check Wishlist",
                        });
                    }} />
                </div>
            </div>
        </>
    );
});

export default Header;