import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {

    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const res = await fetch('/gOuthSignup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    emailID: result.user.email,
                    photo: result.user.photoURL,
                }),
            })

            const data = await res.json();

            console.log(data);

            if (res.status === 400 || !res) {
                window.alert("INVALID DATA");
                console.log("INVALID DATA");
            }
            else {
                navigate('/home');
            }

        } catch (error) {
            console.log("could not signin with google", error);
        }
    }

    return (
        <>
            <button type="button" onClick={handleGoogleClick}>Continue With Google</button>
        </>
    )
}

export default GoogleAuth;