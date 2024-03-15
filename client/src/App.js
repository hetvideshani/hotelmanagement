import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/heroSection';
import Home from './components/home';
import Room from './components/room';
import Signup from './components/signup';
import Signin from './components/signin';
import UserHome from './components/userHome';
import WishList from './components/wishList';
import Extra from './components/extra';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HeroSection />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:roomid' element={<Room />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/wishlist' element={<WishList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
