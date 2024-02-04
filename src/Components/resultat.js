import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BannerImage from "../Assets/briefcase_115190.png";

function ResultatUn() {
    let { salaire } = useParams();
    const [animatedSalaire, setAnimatedSalaire] = useState(0);

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

    return (
        <div className="resultat">
            <h1>Votre potentiel salaire s'élève à <span>{Math.round(animatedSalaire)} $</span>, d'après notre modèle intelligent.</h1>
            <div className="maImage4">
                <img src={BannerImage} alt="Briefcase"/>
            </div>
        </div>
    );
}

export default ResultatUn;
