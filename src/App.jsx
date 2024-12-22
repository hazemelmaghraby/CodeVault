import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Registeration/Login.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import Register from './components/Registeration/Register.jsx';
import ShowData from './components/Registeration/showData.jsx';
import Landing from './components/Home/Landing.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Registeration/profile/Profile.jsx';
import PremiumPlans from './components/PremuimPlans/PremuimPlans.jsx';
import Marketplace from './components/Marketplace/Marketplace.jsx';
import MarketpalceManagement from './components/Admin/MarketpalceManagement.jsx';
import UnderDev from './constants/components/UnderDev.jsx';
import SocialMedia from './components/Social/SocialMedia.jsx'
import AddProduct from './components/Admin/AddProduct/AddProduct.jsx';
import Contact from './Contact/Contact.jsx';
import OurTeam from './components/ourTeam/ourTeam.jsx';
import RemoveProduct from './components/Admin/RemoveProduct/RemoveProduct.jsx';
import ProductsList from './components/Marketplace/ProductsList.jsx';
import TestFirestore from './components/Marketplace/Local.jsx';
import Footer from './components/Footer/Footer.jsx';
import Cart from './components/Marketplace/Cart/Cart.jsx';
import AddProductTest from './components/Admin/AddProduct/AddProductTest.jsx';

// import { SpeedInsights } from "@vercel/speed-insights/next"
// import Test from './components/Home/test.jsx';

const App = () => {
  return (
    <div>
      {/* Navbar is placed outside Routes to appear on all pages */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/data" element={<ShowData />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/premium" element={<PremiumPlans />} />
          <Route path="/market" element={<Marketplace />} />
          <Route path="/marketManage" element={<MarketpalceManagement />} />
          <Route path="/productAdd" element={<AddProduct />} />
          <Route path="/productRemove" element={<MarketpalceManagement />} />
          <Route path="/social" element={<SocialMedia />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pro" element={<ProductsList />} />
          <Route path="/testt" element={<TestFirestore />} />
          <Route path="/ourteam" element={<OurTeam />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/testing" element={<AddProductTest />} />
          {/* <Route path="/ourTeam" element={<OurTeam />} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
