import React from "react";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import {Link} from "react-router-dom";

const About= () => {
    return <div className="about-section-container">
        <div className="about-background-image-container">
        </div>
        <div className="about-section-image-container">
            <img src={AboutBackgroundImage} alt=""/>
        </div>
        <div className="about-section-text-container">
            <p className="primary-subheading">Statistique</p>
            <h1 className="primary-heading">
                Le salaire
            </h1>
            <p className="primary-text">
                Une des variables importantes dans le cadre de nos vies. Nous vous proposons l'histoire de l'élaboration de nos recherches à travers de nombreuses visualisations graphiques et statistiques.          </p>
            <div className="about-buttons-container">
                <Link to="/stat" className="link-button"><button className="secondary-button"> En savoir plus...</button></Link>
            </div>
        </div>
    </div>;
};

export default About;
