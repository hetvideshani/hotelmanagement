import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const WishList = () => {
    const [user, setUser] = useState({});
    const [rooms, setRooms] = useState([]);

    const getUserRoom = async () => {
        try {
            const res = await fetch('/getLoggedUser', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).catch(err => console.log(err));

            const response = await res.json();

            if (res.status == 200) {
                setUser(response.currentUser);
                console.log(user);
                console.log(response);
                console.log(response.currentUser.saved);
                setRooms(response.currentUser.saved);
                console.log(rooms[0]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserRoom();
    }, [])

    const removeRoom = async (id) => {
        try {
            const response = await fetch(`/deleteRoom/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const displayHome = rooms.map((room) => {
        console.log(room);
        return (
            <>
                <div className="card" style={{ width: "18rem", float: "left", height: "60vh", margin: "10px" }}>
                    <img src={room.room.picture} className="card-img-top" style={{ width: "100%", height: "30vh" }} />
                    <div className="card-body">
                        <h5 className="card-title">Room Category - {room.room.category}</h5>
                        <p className="card-text">Rating - {room.room.rating}</p>
                        <a href={"/home/" + room.room._id} className="btn btn-primary">check more</a>
                        <br />
                        <div><button onClick={() => removeRoom(room._id)}>Remove from wishlist</button></div>
                    </div>
                </div>
            </>
        )
    });

    return (
        <>
            <h2>WishList of {user.name}</h2>
            <div>{displayHome}</div>
        </>
    );
}



export default WishList