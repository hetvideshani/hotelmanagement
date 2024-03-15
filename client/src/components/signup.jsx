import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import GoogleAuth from './googleAuth';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        emailId: "",
        contactNo: "",
        location: "",
        password: "",
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });

        console.log(user);
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, emailID, contactNo, location, password } = user;

        const res = await fetch('/userSignup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, emailID, contactNo, location, password
            })
        }).catch(err => {
            console.log(err);
        })

        const result = await res.json();

        if (res.status === 422 || !result) {
            window.alert("INVALID DATA");
            console.log("INVALID DATA");
        } else {
            window.alert("Registration successfull");
            console.log("Registration successfull");

            navigate("/home");
        }
    }

    return (
        <>
            <div className="mainBody" style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form method="POST">
                    <div className="container form" >
                        <div className="row">
                            <div className="col-6">
                                Name
                            </div>
                            <div className="col-6">
                                <input type="text" name="name" placeholder="eg. abc@gmail.com" value={user.name} onChange={handleInputs} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Email
                            </div>
                            <div className="col-6">
                                <input type="text" name="emailID" placeholder="eg. abc@gmail.com" value={user.emailID} onChange={handleInputs} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Contact No.
                            </div>
                            <div className="col-6">
                                <input type="text" name="contactNo" placeholder="eg. 1234567890" value={user.contactNo} onChange={handleInputs} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Location
                            </div>
                            <div className="col-6">
                                <input type="text" name="location" value={user.location} onChange={handleInputs} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Password
                            </div>
                            <div className="col-6">
                                <input type="text" name="password" value={user.password} onChange={handleInputs} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 btn">
                                <button onClick={postData}>Submit</button>
                            </div>
                        </div>

                        <GoogleAuth />
                    </div>
                </form>
            </div >
        </>
    )
}

export default Signup;