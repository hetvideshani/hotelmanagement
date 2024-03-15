import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import GoogleAuth from './googleAuth';

const Signin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        emailID: "",
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

        const { emailID, password } = user;

        const res = await fetch('/userSignin', {
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
                                Email
                            </div>
                            <div className="col-6">
                                <input type="text" name="emailID" placeholder="eg. abc@gmail.com" value={user.emailID} onChange={handleInputs} />
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
                                <button onClick={postData}>LOGIN</button>
                            </div>
                        </div>

                        <GoogleAuth />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin;