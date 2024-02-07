import React, { useState, useEffect } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import BannerImage from "../Assets/briefcase_115190.png";
import BannerImage2 from "../Assets/money.png";
import imageHomme from '../Assets/180677.png';
import imageFemme from '../Assets/417776.png';

function ResultatUn() {
    const [animatedSalaire, setAnimatedSalaire] = useState(0);

    const location = useLocation();
    const { salaire = '0', country = 'Non spécifié', education_level = 'Non spécifié', job_title = 'Non spécifié', race = 'Non spécifié', gender = 'Non spécifié', years_of_experience = 'Non spécifié', age = 'Non spécifié', senior = 'Non spécifié' } = location.state ?? {};
    useEffect(() => {
        const finalSalaire = parseInt(salaire, 10);
        if (!isNaN(finalSalaire)) {
            const increment = finalSalaire / 100;

            const interval = setInterval(() => {
                setAnimatedSalaire((prevSalaire) => {
                    const updatedSalaire = prevSalaire + increment;
                    if (updatedSalaire >= finalSalaire) {
                        clearInterval(interval);
                        return finalSalaire;
                    }
                    return updatedSalaire;
                });
            }, 20);

            return () => clearInterval(interval);
        }
    }, [salaire]);
    const [currentImage, setCurrentImage] = useState(BannerImage);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage === BannerImage ? BannerImage2 : BannerImage));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    function getEducationLevelText(education_level) {
        switch (education_level) {
            case '0':
                return 'Bac';
            case '1':
                return 'Bac +3 / Licence / BUT ...';
            case '2':
                return 'Bac +5 / Master / École ...';
            case '3':
                return 'Doctorat';
            default:
                return 'Information non disponible';
        }
    }
    function getSeniorText(senior) {
        switch (senior) {
            case '0':
                return 'Débutant';
            case '1':
                return 'Senior';
            default:
                return 'Information non disponible';
        }
    }
    function getImageBasedOnGender(gender) {
        switch (gender) {
            case 'Male':
                return imageHomme;
            case 'Female':
                return imageFemme;
            default:
                return BannerImage;
        }
    }
    return (
        <div>
            <div className="resultat">
                <h1>Votre potentiel salaire s'élève à <span>{Math.round(animatedSalaire)} $</span>, d'après notre modèle
                    intelligent.</h1>
                <div className="maImage4">
                    <img src={currentImage} alt="Switching Image"/>
                </div>
            </div>
            <div className="profil-container">
                <h2>{job_title}</h2>
                <img src={getImageBasedOnGender(gender)} alt="Genre"/>
                <p><strong>Pays:</strong> {country}</p>
                <p><strong>Niveau d'éducation:</strong> {getEducationLevelText(education_level)}</p>
                <p><strong>Éthnie:</strong> {race}</p>
                <p><strong>Années d'expérience:</strong> {years_of_experience} année(s)</p>
                <p><strong>Âge:</strong> {age} ans</p>
                <p><strong>Ancienneté:</strong> {getSeniorText(senior)}</p>
            </div>
        </div>
    );
}

export default ResultatUn;
