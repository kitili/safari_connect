// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './styles/images.css';
import './styles/navbar.css';

import HomePage from './pages/HomePage';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import Matchmaking from './pages/Matchmaking';
import TripPlanner from './pages/TripPlanner';
import Signup from './pages/Signup'; 

import Login from './pages/Login';
import Navbar from './components/Navbar';
import NairobiMuseumPackage from './pages/NairobiMuseumPackage';
import DianiBeachPackage from './pages/Diani';
import HellsGatePackage from './pages/HellsGatePackage';
import TsavoWestPackage from './pages/TsavoWestPackage';
import KaruraForestPackage from './pages/KaruraForestPackage';
import GediRuinsPackage from './pages/GediRuinsPackage';
import VascoDaGamaPackage from './pages/VascoDaGamaPackage';
import WildWatersPackage from './pages/WildWatersPackage';
import BomasOfKenyaPackage from './pages/BomasOfKenya';
import BuffaloSpringsPackage from './pages/BuffaloSpringsPackage';
import KisumuMuseumPackage from './pages/KisumuMuseumPackage';
import GiraffeCenterPackage from './pages/Giraffecenterpackage';
import MaasaiMaraPackage from './pages/MaasaiMaraPackage';
import LewaConservancyPackage from './pages/LewaConservancyPackage';
import ArabukoSokokePackage from './pages/ArabukoSokokePackage';
import MarafaPackage from './pages/MarafaPackage';
import MaasaiMarketPackage from './pages/MaasaiMarketPackage';
import DungaBeachPackage from './pages/DungaBeachPackage';
import OserengoniPackage from './pages/OserengoniPackage';
import AlmasiArtPackage from './pages/AlmasiArtPackage';
import LichthausPackage from './pages/LichthausPackage';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-100 min-h-screen">
        <ToastContainer position="top-center" autoClose={3000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:matchId" element={<Chat />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/nairobi-museum" element={<NairobiMuseumPackage />} />
          <Route path="/diani" element={<DianiBeachPackage />} />
        <Route path="/hells-gate" element={<HellsGatePackage />} />
        <Route path="/tsavo-west"element={<TsavoWestPackage/>} />
        <Route path="/karura-forest"element={<KaruraForestPackage/>} />
         <Route path="/gedi-ruins"element={<GediRuinsPackage/>} />
          <Route path="/vascodagama"element={<VascoDaGamaPackage/>} />
          <Route path="/wildwaters"element={<WildWatersPackage/>} />
           <Route path="/bomasofkenya"element={<BomasOfKenyaPackage/>} />
               <Route path="/buffalosprings"element={<BuffaloSpringsPackage/>} />
               <Route path="/kisumumuseum"element={<KisumuMuseumPackage/>} />
                <Route path="/giraffecenter"element={<GiraffeCenterPackage/>} />
                 <Route path="/maasai-mara"element={<MaasaiMaraPackage/>} />
                  <Route path="/lewawildlife"element={<LewaConservancyPackage/>} />
                   <Route path="/arabukoforest"element={<ArabukoSokokePackage/>} />
                    <Route path="/marafa"element={<MarafaPackage/>} />
                    <Route path="/maasai-mkt"element={<MaasaiMarketPackage/>} />
                    <Route path="/dunga-beach"element={<DungaBeachPackage/>} />
                     <Route path="/oserengoni"element={<OserengoniPackage/>} />
                       <Route path="/almasi"element={<AlmasiArtPackage/>} />
                        <Route path="/lichthaus"element={<LichthausPackage/>} />
                        <Route path="/admin"element={<AdminDashboard/>} />
                  
        </Routes>
      </div>
    </Router>
  );
}

export default App;