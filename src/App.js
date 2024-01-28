import './App.css';
import Home from "./Components/Home"
import About from "./Components/About";
import Work from "./Components/Work";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Stat from "./Components/Stat";
import React from 'react';

function Accueil() {
    return (
        <div>
            <Home/>
            <About/>
            <Work/>
        </div>
    );
}
function Statistique() {
    return (
        <div>
            <Stat/>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                {/* Définir les routes ici */}
                <Routes>
                    <Route path="/stat" element={<Statistique/>}/>
                    <Route path="/" element={<Accueil/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
