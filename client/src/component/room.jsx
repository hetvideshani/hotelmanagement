import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roomPic from '../images/roomPage.png'
import Header from "./header";
import Swal from 'sweetalert2'


const Room = () => {
    let [user, setUser] = useState(null);
    const [room, setRoom] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    const getRoom = async () => {
        const res = await fetch(`http://localhost:5555/getOneRoom/${params.roomid}`
            , {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
        ).catch(err => console.log(err))

        const result = await res.json();
        setRoom(result);
        console.log(room);
    }

    const addToWishlist = async (e) => {
        e.preventDefault();
        const email = user;
        const roomid = room._id;
        console.log(email);
        console.log(roomid);
        const res = await fetch('http://localhost:5555/addToWishlist', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, roomid
            })
        }).catch(err => console.log(err));

        if (res.status === 200) {
            navigate('/wishlist');
        }
    }

    useEffect(() => {
        setUser(localStorage.getItem('email'));
        getRoom();
    }, []);

    return (
        <>
            <div className="w-screen h-screen bg-blue-200 overflow-x-hidden">
                <Header />
                <div className="w-full h-screen fixed overflow-x-hidden">
                    <img src={room.picture} className="w-full h-full" />
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full z- overflow-hidden bg-blue-800 bg-fixed opacity-40"></div>
                    <div className="absolute bottom-0 left-36 top-16 right-0 top-0 w-3/4 h-4/5 flex text-white">
                        <div className="w-1/2 h-4/5 mt-8 ">
                            <img src={room.picture} className="w-full h-full" />
                        </div>
                        <div className="w-1/2 h-full pt-20 pl-20">
                            <div className="text-3xl font-medium">
                                {room.HName}
                            </div>
                            <br />
                            <div>
                                Our rooms are designed to transport
                                you into an environment made for leisure.
                                Take your mind off the day-to-day of home
                                life and find a private paradise for yourself.
                            </div>
                            <br />
                            <div className="text-xl font-medium">
                                Reviews
                            </div>
                            <div className="text-xl font-medium">
                                Price :  {room.prize}
                            </div>
                            <br />
                            <div className="flex justify-end">
                                <div>
                                    <button class="mr-10 bg-white hover:bg-blue-700 hover:text-white h-9 text-black font-bold py-1 px-4 rounded" onClick={(e) => {

                                        if (user) {
                                            addToWishlist(e);
                                        }
                                        // console.log("User has done log in");
                                        else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "Please signup to save the room",
                                            });
                                        }
                                    }}>
                                        Save For Later
                                    </button>
                                </div>
                                <div className="">
                                    <button class="bg-white hover:bg-blue-700 hover:text-white h-9 text-black font-bold py-1 px-4 rounded" onClick={() => {
                                        if (user)
                                            navigate('/bookingform/' + room._id)
                                        else
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "Please signup to book the room",
                                            });
                                    }}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Room