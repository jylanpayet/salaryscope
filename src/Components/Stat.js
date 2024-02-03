import React, {useEffect, useState} from "react"
import axios from "axios";
import BannerImage2 from "../Assets/3296160.png";
import BannerImage3 from "../Assets/user_icon-icons.com_66546.png";
import BannerImage4 from "../Assets/3788090.png";
import BannerImage5 from "../Assets/180677.png";
import BannerImage6 from "../Assets/417776.png";

import Plot from "react-plotly.js";

const Stat= () => {
    const [graphs, setGraphs] = useState(null);
    const [test,setTest] = useState(null)
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
        const getStat = async () => {
            try {
                const { data } = await axios.get('/stats');
                setTest({
                    age_mean:JSON.parse(data.age_mean),
                    user_nbr:JSON.parse(data.user_nbr),
                    salary_mean:JSON.parse(data.salary_mean)
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };
        getData();
        getStat();
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
            {test && (
                <div className="stat-container">
                    {/* Carré 2 */}
                    <div className="stat-carré">
                        <img src={BannerImage3} alt="Description pour image 2"/>
                        <p>Participants à l'étude: <strong>{test.user_nbr} </strong></p>
                    </div>

                    {/* Carré 1 */}
                    <div className="stat-carré">
                        <img src={BannerImage4} alt="Description pour image 1"/>
                        <p>Moyenne d'age femme: <strong>{test.age_mean.age[" Female"].toFixed(2)} ans</strong></p>
                    </div>
                    {/* Carré 5 */}
                    <div className="stat-carré">
                        <img src={BannerImage4} alt="Description pour image 4"/>
                        <p><p>Moyenne d'age homme: <strong>{test.age_mean.age[" Male"].toFixed(2)} ans</strong></p></p>
                    </div>


                    {/* Carré 3 */}
                    <div className="stat-carré">
                        <img src={BannerImage5} alt="Description pour image 3"/>
                        <p>Salaire moyen des Hommes: <strong>{test.salary_mean[" Male"].toFixed(2) * 100000} $</strong></p>
                    </div>
                    {/* Carré 4 */}
                    <div className="stat-carré">
                        <img src={BannerImage6} alt="Description pour image 3"/>
                        <p>Salaire moyen des Femmes: <strong>{test.salary_mean[" Female"].toFixed(2) * 100000} $</strong></p>
                    </div>



                </div>
            )}

            {graphs && (
                <>
                    {/* Graphique 1: Heures par Semaine par Salaire */}
                    <div className="titreD">
                        <h3>Analyse de la relation entre le salaire et le nombre d'heures travaillées par semaine</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.heuresParSemaineBySalary.data}
                            layout={graphs.heuresParSemaineBySalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ce graphique est très intéressant car il nous permet de tirer trois conclusions principales. Tout d'abord, pour les classes de travail correspondant au gouvernement d'État et fédéral, nous observons une corrélation entre le nombre d'heures travaillées et le salaire, ce qui confirme la notion que 'plus on travaille, plus on gagne'. Ensuite, pour la catégorie des personnes qui ne travaillent pas et qui, de ce fait, ne perçoivent aucun revenu, les courbes sont inexistantes. Enfin, pour la majorité des autres classes de travail, nous constatons que les courbes suivent plus ou moins la même tendance que celle de la première catégorie.</p>                    </div>

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
                        <p>Cette carte révèle des informations intéressantes, malgré l'absence de données pour certains pays. On constate que la France et l'Iran se distinguent par un salaire moyen avoisinant les 50 000 $ par an. En revanche, pour la majorité des autres pays représentés, le salaire moyen est plus proche des 30 000 $ par an.</p>
                    </div>

                    {/* Graphique 3: Tranche Salariale par Race */}
                    <div className="titreD">
                        <h3>Représentation des différentes éthnies et genres au sein des différentes tranches salariales</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.trancheSalary.data}
                            layout={graphs.trancheSalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Cette analyse conduit à une conclusion surprenante : que ce soit pour un salaire moyen supérieur ou inférieur à 50 000 $ par an, c'est systématiquement la population d'éthnie blanche qui perçoit le revenu le plus élevé.</p>
                    </div>

                    {/* Graphique 4: Capital Positif par Classe de Travail */}
                    <div className="titreD">
                        <h3>Représentation du capital en fonction de la classe de travail</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByWorkclass.data}
                            layout={graphs.positiveCapitalByWorkclass.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Il semble que le secteur privé soit la classe de travail générant le plus de capital, suivi de près par l'auto-entrepreneuriat.</p>
                    </div>

                    {/* Graphique 5: Capital Positif par Niveau d'Éducation */}
                    <div className="titreD">
                        <h3>Représentation du capital en fonction du niveau d'éducation</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByEducation.data}
                            layout={graphs.positiveCapitalByEducation.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ici, il est évident que les personnes possédant un capital élevé sont généralement celles ayant un niveau d'études supérieur. Cependant, il est également notable que ce sont ces mêmes individus qui sont le plus susceptibles de subir des pertes de capital.</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Stat;
