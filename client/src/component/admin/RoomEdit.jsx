import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'


const RoomEdit = () => {
    const [room, setRoom] = useState({
        category: "",
        prize: "",
        rating: "",
    })

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRoom();
    }, [])

    const getRoom = async () => {
        fetch(`http://localhost:5555/getOneRoom/${params.id}`, {
            method: "GET"
        }).then(res => res.json()).then(res => setRoom(res));
        console.log(room);
    }

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setRoom({ ...room, [name]: value });
        console.log(room);
    }

    const postData = async () => {
        const res = await fetch('http://localhost:5555/updateroom/' + params.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                room
            })
        });
        if (res.status === 200) {
            navigate('/adminrooms')
        }
    }

    return (
        <>
            <div>
                <Navbar />
                <div className='float-left'>
                    <div className="w-5/6 h-screen fixed overflow-x-hidden bg-blue-300 float-start">
                        <section class="w-full p-6 bg-indigo-600 rounded-md shadow-md dark:bg-[rgba(7,18,46,1)]">
                            <div class="grid grid-rows-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label class="text-white dark:text-gray-200" for="username">Room Category</label>
                                    <input name="category" type="text" value={room.category} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                </div>
                                <div>
                                    <label class="text-white dark:text-gray-200" for="username">Prize</label>
                                    <input name="prize" type="text" value={room.prize} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                </div>
                                <div>
                                    <label class="text-white dark:text-gray-200" for="username">Rating</label>
                                    <input name="rating" type="text" value={room.rating} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                </div>
                                <div class="flex justify-end mt-6">
                                    <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600" onClick={postData}>Save</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomEdit