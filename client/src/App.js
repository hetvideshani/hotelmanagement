import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/home'
import Signin from './component/signin';
import Signup from './component/signup';
import Room from './component/room';
import Bookingform from './component/bookingform';
import Bookings from './component/Bookings';
import Wishlist from './component/WishList'
import RoomFromWishlist from './component/RoomFromWishlist';
import Layout from './component/admin/layout';
import AdminRooms from './component/admin/AdminRooms';
import AdminBookings from './component/admin/AdminBookings';
import AdminUser from './component/admin/AdminUser';
import UserEdit from './component/admin/UserEdit';
import RoomEdit from './component/admin/RoomEdit';
import BookingEdit from './component/admin/BookingEdit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home/:roomid' element={<Room />} />
          <Route path='/bookingform/:roomid' element={<Bookingform />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/roomfromwishlist/:roomid' element={<RoomFromWishlist />} />
          <Route path='/admindashboard' element={<Layout />} />
          <Route path='/adminrooms' element={<AdminRooms />} />
          <Route path='/adminbookings' element={<AdminBookings />} />
          <Route path='/adminusers' element={<AdminUser />} />
          <Route path='/useredit/:id' element={<UserEdit />} />
          <Route path='/roomedit/:id' element={<RoomEdit />} />
          <Route path='/bookingedit/:id' element={<BookingEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
