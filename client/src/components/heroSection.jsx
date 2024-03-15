import React, { useState, useEffect } from 'react';
import '../style/heroSection.css';
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

    let [room, setroom] = useState(0);
    let navigate = useNavigate();

    let heading = "Stay Quietly,\n With No Worries"
    return (
        <>
            <div className='heroSection'>
                <div className="searchPage">
                    <div className="searchHotel">
                        <input type='text' placeholder="Search Destination / Hotel" className="inputBox" />
                    </div>
                    <div className="checkIn">
                        <input type='text' placeholder="Check In" className="inputBox" onBlur={(e) => { e.target.type = 'text' }} onFocus={(e) => { e.target.type = 'date' }} />
                    </div>
                    <div className="checkOut">
                        <input type='text' placeholder="Check Out" className="inputBox" onBlur={(e) => { e.target.type = 'text' }} onFocus={(e) => { e.target.type = 'date' }} />
                    </div>

                    <div className='room'>
                        <div className='roomHead'>
                            Room
                        </div>
                        <div className='roomCount'>
                            {room}
                        </div>
                        <div className='incdec'>
                            <div className='inc'>
                                <GrFormAdd onClick={() => { setroom(room + 1) }} />
                            </div>
                            <div className='dec'>
                                <GrFormSubtract onClick={() => { if (room > 0) { setroom(room - 1) } }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='heading'>
                    <span>
                        Stay Quietly,
                    </span>
                    <br />
                    <span>
                        With No Worries
                    </span>
                </div>
                <div className='discription'>
                    <div>
                        <span>Welcome to our hotel booking platform, where your travel experience becomes</span><br />
                        <span>easier and more enjoyable. With our platform, you can discover the perfect</span><br />
                        <span>accommodation for your stay worldwide.</span>
                    </div>
                </div>

                <div className='discover' onClick={() => {
                    navigate('/home');
                }}>
                    <span className='discoverName'>DISCOVER</span>
                    <span className='arrow'><FaLongArrowAltRight />
                    </span>
                </div>
            </div >
        </>
    )
}

export default HeroSection;