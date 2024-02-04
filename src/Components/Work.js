import React from "react";
import Questionnaire from "../Assets/pick-meals-image.png"
import Performance from "../Assets/choose-image.png"
import Lac from "../Assets/delivery-image.png"

const Work= () => {
    const workInfoData= [
        {
            image: Questionnaire,
            title: "Questionnaire rapide",
            text: "Des questions vous seront posées pour pouvoir obtenir la meilleure précision possible."
        },
        {
            image: Performance,
            title: "Performance",
            text: "Un outils de machine learning performant pour répondre à vos attentes."
        },
        {
            image: Lac,
            title: "Grande source de données",
            text: "Une analyse détaillée avec des visualiations."
        }
    ];
    return (<div className="work-section-wrapper">
            <div className="work-section-top">
                <h1 className="primary-heading"> Comment ça marche ?</h1>
                <p className="primary-text">
                    <h3>C'est très simple !</h3><br></br><br></br>
                    Il suffit de répondre à nos différentes questions, et notre application se chargera du reste afin de prédire
                    votre salaire probable. </p>
            </div>
            <div className="work-section-bottom">
                {
                    workInfoData.map((data) => (
                        <div className="work-section-info">
                            <div className="info-boxes-img-container">
                                <img src={data.image} alt=""/>
                            </div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};


export default Work;
