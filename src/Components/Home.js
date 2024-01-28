import React from "react"
import Navbar from "./Navbar"
import BannerImage from "../Assets/home-banner-image.png"
import {FiArrowRight} from "react-icons/fi";
const Home= () => {
    return (<div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Révélez votre potentiel salarial avec précision
                    </h1>
                    <p className="primary-text">
                        Découvrez ce que l'avenir vous réserve en matière de rémunération grâce à notre intelligence
                        artificielle avancée.
                    </p>
                    <button className="secondary-button">
                        Essayez maintenant <FiArrowRight/>
                    </button>
                    <div className="home-image-container">
                    </div>
                </div>
                <img src={BannerImage} alt="" class="maImage2"/>
            </div>
        </div>
    );
};

export default Home;
