import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Room = () => {
    const [room, setRoom] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRoom();
    }, []);

    const getRoom = async () => {
        const res = await fetch(`/getOneRoom/${params.roomid}`
            , {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
        ).catch(err => console.log(err))

        const result = await res.json();
        setRoom(result);
        console.log(room);
    }

    const addToWishlist = async () => {
        // e.preventDefault();
        const res = await fetch(`/addToWishlist/${params.roomid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }).catch(err => console.log(err))

        const result = await res.json();

        if (res.status == 200) {
            navigate('/wishlist');
        }
    }

    return (
        <>
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={room.picture} className="card-img-top" style={{ width: "100%", height: "30vh" }} />
                    <div className="card-body">
                        <h5 className="card-title">Room No. - {room.RID}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                        <br />
                        <button onClick={addToWishlist}>save for later</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room;