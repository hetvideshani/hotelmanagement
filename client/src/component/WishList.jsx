import React, { useEffect, useState } from 'react';
import Header from './header';
import pic from '../images/fun.svg'
import { useNavigate } from 'react-router-dom';

const WishList = () => {
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(localStorage.getItem('email'));
        displayWishlist();
    }, [])

    const displayWishlist = async () => {
        let email = localStorage.getItem('email');
        console.log(email);
        try {
            const res = await fetch('http://localhost:5555/displayWishlist', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            })
            const result = await res.json();

            let tempArr = [];
            result.map(room => {
                tempArr.push(room.room)
            })
            setWishlist(tempArr);
        } catch (err) {
            console.log(err);
        }
    }

    const showWishlist = wishlist.map((room) => {
        return (
            <>
                <div className="w-1/5 h-fit bg-white float-start m-5">
                    <div className="w-full h-32 bg-slate-800" onClick={() => {
                        navigate('/roomfromwishlist/' + room._id)
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
                                    navigate('/bookingform/' + room._id)
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
                        <div className="h-14 flex justify-center ">
                            <div className="">
                                <div className="text-3xl h-3/5 flex justify-center items-center border-b-2 border-blue-950">
                                    Wishlist
                                </div>
                            </div>
                        </div>
                        <div className="ml-10 w-screen">
                            {showWishlist}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WishList;