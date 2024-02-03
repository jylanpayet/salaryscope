import React from "react";
import PickMeals from "../Assets/pick-meals-image.png"
import ChooseMeals from "../Assets/choose-image.png"
import DeliveryMeals from "../Assets/delivery-image.png"
import HomeIcon from "@mui/icons-material/Home";

const Work= () => {
    const workInfoData= [
        {
            image: PickMeals,
            title: "Questionnaire rapide",
            text: "Des questions vous seront posées pour pouvoir obtenir la meilleure précision possible."
        },
        {
            image: ChooseMeals,
            title: "Performance",
            text: "Un outils de machine learning performant pour répondre à vos attentes."
        },
        {
            image: DeliveryMeals,
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
