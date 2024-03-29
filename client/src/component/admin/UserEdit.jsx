import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom'

const UserEdit = () => {
    const [user, setUser] = useState({
        name: "",
        emailID: "",
        contactNo: ""
    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        fetch(`http://localhost:5555/getoneuser/${params.id}`, {
            method: "GET"
        }).then(res => res.json()).then(res => setUser(res));
        console.log(user);
    }

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
        console.log(user);
    }

    const postData = async () => {
        const res = await fetch('http://localhost:5555/updateuser/' + params.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user
            })
        });
        if (res.status === 200) {
            navigate('/adminusers')
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
                                    <label class="text-white dark:text-gray-200" for="username">Username</label>
                                    <input name="name" type="text" value={user.name} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                </div>
                                <div>
                                    <label class="text-white dark:text-gray-200" for="username">Email Address</label>
                                    <input name="emailID" type="text" value={user.emailID} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
                                </div>
                                <div>
                                    <label class="text-white dark:text-gray-200" for="username">Contact No.</label>
                                    <input name="contactNo" type="text" value={user.contactNo} class="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-[rgba(7,18,46,1)] dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleInputs} />
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

export default UserEdit