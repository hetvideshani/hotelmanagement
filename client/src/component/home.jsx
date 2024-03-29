import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import pic from '../images/fun.svg'
import Header from "./header";
import Swal from 'sweetalert2'

const Home = () => {
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    const getAllRooms = async () => {
        const res = await fetch('http://localhost:5555/getAllRoom'
            , {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        ).catch(err => console.log(err))

        const result = await res.json();

        if (res.status == 200) {
            setRooms(result);
            console.log(rooms);
        }
    }

    useEffect(() => {
        setUser(localStorage.getItem('email'))
        getAllRooms();
    }, []);

    const displayRoom = rooms.map((room) => {
        return (
            <>
                <div className="w-1/5 h-fit bg-white float-start m-5">
                    <div className="w-full h-32 bg-slate-800" onClick={() => {
                        navigate('/home/' + room._id)
                    }}>
                        <img src={room.picture} className="h-full w-full object-cover" />
                    </div>
                    <div className="m-2 h-28">
                        <div className="w-full h-9">
                            <div className="float-start text-xl">
                                {room.category} Room
                            </div>
                            <div className="float-end">
                                Available : {room.available}
                            </div>
                        </div>
                        <div className="w-full border-b-2 m-0 pb-2">
                            {room.prize}/day
                        </div>
                        <div className="w-full mt-2">
                            <div className="w-2/5 float-start mt-1">
                                <img src={pic} className="object-cover" />
                            </div>
                            <div className="float-end">
                                <button class="bg-gray-400 hover:bg-blue-700 h-9 text-black font-bold py-2 px-4 rounded" onClick={() => {
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
            </>
        )
    })


    return (
        <>
            <div className="w-screen h-auto bg-blue-200 overflow-x-hidden">
                <Header />

                <div>
                    <div className="bg-blue-200 w-screen h-auto  mt-4">
                        <div className="h-20 flex justify-center ">
                            <div className="">
                                <div className="text-3xl h-3/5 flex justify-center items-center border-b-2 border-blue-950">
                                    Available Rooms
                                </div>
                                <div className="flex justify-center">
                                    All rooms are designed for your comfort
                                </div>
                            </div>
                        </div>
                        <div className="ml-10 w-screen">
                            {displayRoom}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home


// < div className = "w-1/5 h-72 bg-white float-start m-5" >
//                             <div className="w-full h-9/12">
//                                 <img src="https://i.pinimg.com/originals/6f/72/35/6f7235447ca2c37edf7df110269d363b.jpg" className="h-full w-full" />
//                             </div>
//                             <div className="m-2">
//                                 <div className="w-full h-9">
//                                     <div className="float-start text-xl">
//                                         Royal Room
//                                     </div>
//                                     <div className="float-end">
//                                         Available : Yes
//                                     </div>
//                                 </div>
//                                 <div className="w-full border-b-2 m-0 pb-2">
//                                     5000/day
//                                 </div>
//                                 <div className="w-full mt-2">
//                                     <div className="w-2/5 float-start mt-1">
//                                         <img src={pic} className="object-cover" />
//                                     </div>
//                                     <div className="float-end">
//                                         <button class="bg-gray-400 hover:bg-blue-700 h-9 text-black font-bold py-1 px-4 rounded">
//                                             Book Now
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div >
//                         <div className="w-1/5 h-72 bg-white float-start m-5">
//                             <div className="w-full h-9/12">
//                                 <img src="https://i.pinimg.com/originals/6f/72/35/6f7235447ca2c37edf7df110269d363b.jpg" className="h-full w-full" />
//                             </div>
//                             <div className="m-2">
//                                 <div className="w-full h-9">
//                                     <div className="float-start text-xl">
//                                         Royal Room
//                                     </div>
//                                     <div className="float-end">
//                                         Available : Yes
//                                     </div>
//                                 </div>
//                                 <div className="w-full border-b-2 m-0 pb-2">
//                                     5000/day
//                                 </div>
//                                 <div className="w-full mt-2">
//                                     <div className="w-2/5 float-start mt-1">
//                                         <img src={pic} className="object-cover" />
//                                     </div>
//                                     <div className="float-end">
//                                         <button class="bg-gray-400 hover:bg-blue-700 h-9 text-black font-bold py-2 px-4 rounded">
//                                             Book Now
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-1/5 h-72 bg-white float-start m-5">
//                             <div className="w-full h-9/12">
//                                 <img src="https://i.pinimg.com/originals/6f/72/35/6f7235447ca2c37edf7df110269d363b.jpg" className="h-full w-full" />
//                             </div>
//                             <div className="m-2">
//                                 <div className="w-full h-9">
//                                     <div className="float-start text-xl">
//                                         Royal Room
//                                     </div>
//                                     <div className="float-end">
//                                         Available : Yes
//                                     </div>
//                                 </div>
//                                 <div className="w-full border-b-2 m-0 pb-2">
//                                     5000/day
//                                 </div>
//                                 <div className="w-full mt-2">
//                                     <div className="w-2/5 float-start mt-1">
//                                         <img src={pic} className="object-cover" />
//                                     </div>
//                                     <div className="float-end">
//                                         <button class="bg-gray-400 hover:bg-blue-700 h-9 text-black font-bold py-2 px-4 rounded">
//                                             Book Now
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-1/5 h-72 bg-white float-start m-5">
//                             <div className="w-full h-9/12">
//                                 <img src="https://i.pinimg.com/originals/6f/72/35/6f7235447ca2c37edf7df110269d363b.jpg" className="h-full w-full" />
//                             </div>
//                             <div className="m-2">
//                                 <div className="w-full h-9">
//                                     <div className="float-start text-xl">
//                                         Royal Room
//                                     </div>
//                                     <div className="float-end">
//                                         Available : Yes
//                                     </div>
//                                 </div>
//                                 <div className="w-full border-b-2 m-0 pb-2">
//                                     5000/day
//                                 </div>
//                                 <div className="w-full mt-2">
//                                     <div className="w-2/5 float-start mt-1">
//                                         <img src={pic} className="object-cover" />
//                                     </div>
//                                     <div className="float-end">
//                                         <button class="bg-gray-400 hover:bg-blue-700 h-9 text-black font-bold py-2 px-4 rounded">
//                                             Book Now
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>