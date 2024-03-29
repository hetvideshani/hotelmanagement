import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex flex-row text-blue-200 float-left bg-green-900'>
            <div className='flex flex-col gap-3 h-screen w-1/5 items-center px-2 pt-5'>
                <div className='ml-16 w-full py-2 font-bold text-base text-red-400 flex flex-row gap-2  items-center cursor-pointer' > <div className='fa fa-home w-5'></div><div>Dashboard</div></div>
                <Link to='/adminusers' className='ml-16 w-full py-2 font-bold text-base hover:text-red-400 flex flex-row gap-2  items-center cursor-pointer'><div className='fa fa-truck w-5'></div><div>Users</div></Link>
                <Link to='/adminrooms' className='ml-16 w-full py-2 font-bold text-base hover:text-red-400 flex flex-row gap-2  items-center cursor-pointer'><div className='fa fa-box w-5'></div><div>Rooms</div></Link>
                <Link to='/adminbookings' className='ml-16 w-full py-2 font-bold text-base hover:text-red-400 flex flex-row gap-2  items-center cursor-pointer'><div className='fa fa-user w-5'></div><div>Bookings</div></Link>
            </div>
        </div>
    )
}

export default Navbar