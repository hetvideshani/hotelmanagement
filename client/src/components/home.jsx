import React, { useEffect, useState, Link } from "react";
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const getRoom = async () => {
        console.log("Hello");
        const allRooms = await fetch('http://localhost:5555/getAllRoom'
            , {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
        ).catch(err => console.log(err))

        const result = await allRooms.json();

        setRooms(result);
        console.log(rooms);
    }

    const getUser = async () => {
        const currentUser = await fetch('/checkUser'
            , {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).catch(err => console.log(err + "Hello"))

        const displayUser = await currentUser.json();

        console.log(displayUser);
        if (currentUser.status == 200) {
            setUser(displayUser);
        }

        console.log(user.name);
        console.log(user.name !== undefined);
    }

    const logout = async () => {
        try {
            const outUser = await fetch('/logoutUser').catch(err => console.log(err))

            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getRoom();
    }, [])

    useEffect(() => {
        getUser();
    }, [])

    const displayHome = rooms.map((room) => {
        return (
            <>
                <div className="card" style={{ width: "18rem", float: "left", height: "60vh", margin: "10px" }}>
                    <img src={room.picture} className="card-img-top" style={{ width: "100%", height: "30vh" }} />
                    <div className="card-body">
                        <h5 className="card-title">Room Category - {room.category}</h5>
                        <p className="card-text">Rating - {room.rating}</p>
                        <a href={"/home/" + room._id} className="btn btn-primary">check more</a>
                    </div>
                </div>
            </>
        )
    });

    return (
        <>
            {user.name !== undefined ? <><div><button onClick={logout}>logout</button></div><div><a href="/wishlist">WishList</a></div></> : <><div> <a href="/signup">Sign Up</a> </div>
                <div> <a href="/signin">Sign In</a> </div></>}
            <br />
            <div>{displayHome}</div>
        </>
    );
}

export default Home;