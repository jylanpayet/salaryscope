import React, {useEffect, useState} from "react"
import axios from "axios";
import BannerImage2 from "../Assets/3296160.png";
import Plot from "react-plotly.js";

const Stat= () => {
    const [graphs, setGraphs] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/visualization');
                setGraphs({
                    repartitionSalaryInTheWorld: JSON.parse(data.repartitionSalaryInTheWorld),
                    trancheSalary: JSON.parse(data.trancheSalary),
                    positiveCapitalByWorkclass: JSON.parse(data.positiveCapitalByWorkclass),
                    heuresParSemaineBySalary: JSON.parse(data.heuresParSemaineBySalary),
                    positiveCapitalByEducation: JSON.parse(data.positiveCapitalByEducation)
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };
        getData();
    }, []);
    return (
        <div className="dashboard">
            <div className="home-container">
                <div className="home-banner-container">
                    <div className="home-bannerImage-container">
                    </div>
                    <div className="home-text-section">
                        <h2 className="primary-heading">
                            Une histoire
                        </h2>
                        <p className="primary-text">
                            Pourquoi avoir élaborer cette application ? <br/> <br/> "Quand les chiffres se mettent à
                            raconter des histoires."
                        </p>
                        <div className="home-image-container">
                        </div>
                    </div>
                    <img src={BannerImage2} alt="" className="maImage3"/>
                </div>
            </div>
            <div className="stat-container">
                {/* Carré 1 */}
                <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 1"/>
                    <p>75%</p>
                </div>

                {/* Carré 2 */}
                <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 2"/>
                    <p>50%</p>
                </div>

                {/* Carré 3 */}
                <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 3"/>
                    <p>25%</p>
                </div>

                {/* Carré 4 */}
                <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 4"/>
                    <p>85%</p>
                </div>
            </div>

            {graphs && (
                <>
                    {/* Graphique 1: Heures par Semaine par Salaire */}
                    <div className="titreD">
                        <h3>Heures par Semaine par Salaire</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.heuresParSemaineBySalary.data}
                            layout={graphs.heuresParSemaineBySalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Commentaire sur les heures par semaine par salaire</p>
                    </div>

                    {/* Graphique 2: Répartition des Salaires dans le Monde */}
                    <div className="titreD">
                        <h3>Répartition des Salaires dans le Monde</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.repartitionSalaryInTheWorld.data}
                            layout={graphs.repartitionSalaryInTheWorld.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Commentaire sur la répartition des salaires dans le monde</p>
                    </div>

                    {/* Graphique 3: Tranche Salariale par Race */}
                    <div className="titreD">
                        <h3>Tranche Salariale par Race</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.trancheSalary.data}
                            layout={graphs.trancheSalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Commentaire sur la tranche salariale par race</p>
                    </div>

                    {/* Graphique 4: Capital Positif par Classe de Travail */}
                    <div className="titreD">
                        <h3>Capital Positif par Classe de Travail</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByWorkclass.data}
                            layout={graphs.positiveCapitalByWorkclass.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Commentaire sur le capital positif par classe de travail</p>
                    </div>

                    {/* Graphique 5: Capital Positif par Niveau d'Éducation */}
                    <div className="titreD">
                        <h3>Capital Positif par Niveau d'Éducation</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByEducation.data}
                            layout={graphs.positiveCapitalByEducation.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Commentaire sur le capital positif par niveau d'éducation</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Stat;
