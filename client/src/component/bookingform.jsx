import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roomPic from '../images/roomPage.png'
import Header from "./header";

const Bookingform = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const [booking, setBooking] = useState({
        name: "",
        email: "",
        contactNo: null,
        age: null,
        payment: "",
        totalRooms: null,
        checkin: "",
        checkout: "",
        members: "",
        RID: params.roomid
    })

    useEffect(() => {
        setUser(localStorage.getItem('email'));
        console.log(booking);
    }, []);

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setBooking({ ...booking, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, contactNo, age, payment, totalRooms, checkin, checkout, members, RID } = booking

        const res = await fetch('http://localhost:5555/bookroom', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, contactNo, age, payment, totalRooms, checkin, checkout, members, RID
            })
        }).catch(err => console.log(err));

        const result = await res.json();

        navigate('/bookings')

        console.log(result);
        console.log(res.status);
    }


    return (
        <>
            <div className="w-screen h-screen bg-blue-200 overflow-x-hidden">
                <Header />
                <div className="w-full h-screen fixed overflow-x-hidden">
                    <img src={roomPic} className="w-full h-full" />
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full z- overflow-hidden bg-blue-800 bg-fixed opacity-40"></div>
                    <div className="absolute bottom-0 left-36 top-8 right-0 w-3/4 h-4/5 flex text-white" >
                        <section class="w-full p-6 bg-indigo-600 rounded-md shadow-md dark:bg-[rgba(7,18,46,1)]">
                            <form>
                                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label class="text-white dark:text-gray-200" for="username">Username</label>
                                        <input name="name" type="text" value={booking.name} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>

                                    <div>
                                        <label class="text-white dark:text-gray-200" for="emailAddress">Email Address</label>
                                        <input name="email" type="email" value={booking.email} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>

                                    <div>
                                        <label class="text-white dark:text-gray-200" for="password">Contact No.</label>
                                        <input name="contactNo" type="text" value={booking.contactNo} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>

                                    <div>
                                        <label class="text-white dark:text-gray-200" for="passwordConfirmation">Age</label>
                                        <input name="age" type="text" value={booking.age} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>

                                    <div>
                                        <label class="text-white dark:text-gray-200" for="passwordConfirmation">Total Members</label>
                                        <input name="members" type="text" value={booking.members} class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>

                                    <div>
                                        <label class="text-white dark:text-gray-200" for="passwordConfirmation">Total Rooms</label>
                                        <input name="totalRooms" type="text" value={booking.totalRooms} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>
                                    <div>
                                        <label class="text-white dark:text-gray-200" for="passwordConfirmation">Check-in</label>
                                        <input name="checkin" type="date" value={booking.checkin} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>
                                    <div>
                                        <label class="text-white dark:text-gray-200" for="passwordConfirmation">Check-out</label>
                                        <input name="checkout" type="date" value={booking.checkout} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-5">
                                    <div>
                                        <label class="text-white dark:text-gray-200" for="passwordConfirmation">Payment</label>
                                        <select name="payment" value={booking.payment} class="block  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs}>
                                            <option>Cash</option>
                                            <option>Debit/Credit</option>
                                            <option>Netbanking</option>
                                        </select>
                                    </div>
                                    <div class="flex justify-end mt-6">
                                        <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600" onClick={postData}>Book</button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bookingform