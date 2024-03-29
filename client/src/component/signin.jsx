import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import pic from '../images/loginbg.png'
import Swal from 'sweetalert2';
import { IoMdHeart } from "react-icons/io";

const Signin = () => {
    const [user, setUser] = useState({
        emailID: "",
        password: "",
    });

    const navigate = useNavigate();

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });

        console.log(user);
    }

    const postData = async (e) => {
        e.preventDefault();

        const { emailID, password } = user;

        const res = await fetch('http://localhost:5555/userSignin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailID, password
            })
        }).catch(err => console.log(err));

        const result = await res.json();

        console.log(result);
        console.log(res.status);

        if (res.status === 400 || !result) {
            window.alert("INVALID DATA");
            console.log("INVALID DATA");
        } else {
            window.alert("Login successfull");
            console.log("Login successfull");
            localStorage.setItem("email", emailID)
            navigate("/");
        }
    }

    return (
        <>
            <div className="w-screen h-screen bg-blue-200 overflow-x-hidden flex flex-col">
                <div className="w-screen h-16 flex flex-row" style={{ backgroundColor: "#07122e" }}>
                    <div className="text-white w-1/5 text-4xl ml-3 mt-2">
                        HMS
                    </div>
                    <div className="flex flex-row space-x-10 text-3xl ml-10">
                        <div className="text-white ml-3 mt-2" onClick={() => navigate('/')}>
                            Home
                        </div>
                        <div className="text-white ml-3 mt-2" onClick={() => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Please signup to check bookings",
                            });
                        }}>
                            Bookings
                        </div>
                        <div className="text-white ml-3 mt-2" onClick={() => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Only Admin can access this page",
                            });
                        }}>
                            Admin
                        </div>
                        <div className="text-white ml-3 mt-2">
                            About
                        </div>
                        <div className="text-white ml-3 mt-2">
                            Contact
                        </div>
                    </div>
                    <div className="flex flex-row-reverse mt-3 ml-32">

                        <button class="bg-white hover:bg-blue-700 h-9 text-black font-bold py-2 px-4 rounded" onClick={() => {
                            navigate('/signup');
                        }}>
                            Sign Up
                        </button>

                        <IoMdHeart className='text-white h-10 w-8 mr-5' onClick={() => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Please signup to check Wishlist",
                            });
                        }} />
                    </div>
                </div>
                <div className="w-3/4 h-3/4 flex flex-col items-center my-11 mx-36" style={{ backgroundColor: "#07122e" }}>
                    <div className="w-full h-1/6 flex justify-center items-center text-white text-5xl">
                        <div className="border-b-2 ">
                            Log In
                        </div>
                    </div>
                    <div className="w-full h-auto flex flex-row py-8">
                        <div className="h-full w-2/5">
                            <img src={pic}></img>
                        </div>
                        <div className="h-full w-3/6 py-8 ml-8">
                            <form action="#" method="post">
                                <div class="mb-4">
                                    <label for="email" class="block text-white font-medium">Email</label>
                                    <input type="email" name="emailID" placeholder="eg. abc@gmail.com" value={user.emailID} onChange={handleInputs} class="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                </div>
                                <div className="mb-4">
                                    <label for="password" className="block text-white font-medium">Password</label>
                                    <input type="password" name="password" value={user.password} onChange={handleInputs} className="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                </div>
                                <br />
                                <div className="mb-4 w-full flex  justify-end">
                                    <button type="submit" onClick={postData} className="w-1/5 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin