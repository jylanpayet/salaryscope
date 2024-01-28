import React, {useEffect, useState} from "react"
import axios from "axios";
import BannerImage2 from "../Assets/3296160.png";
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
                    <img src={BannerImage2} alt="Description pour image 2"/>
                    <p>Utilisateurs ayant participés: {test.user_nbr}</p>
                </div>

                {/* Carré 1 */}
                <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 1"/>
                     <p>Age moyen des Femmes: {test.age_mean.age[" Female"].toFixed(2)} ans</p>
                </div>
                 {/* Carré 5 */}
                 <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 4"/>
                    <p><p>Age moyen des Hommes: {test.age_mean.age[" Male"].toFixed(2)} ans</p></p>
                </div>

               
                {/* Carré 3 */}
                <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 3"/>
                    <p>Salaire moyen des Hommes: {test.salary_mean[" Male"].toFixed(2) * 100000} $</p>
                </div>
                {/* Carré 4 */}
                <div className="stat-carré">
                    <img src={BannerImage2} alt="Description pour image 3"/>
                    <p>Salaire moyen des Femmes: {test.salary_mean[" Female"].toFixed(2)*100000} $</p>
                </div>


               
            </div>
            )}

            {graphs && (
                <>
                    {/* Graphique 1: Heures par Semaine par Salaire */}
                    <div className="titreD">
                        <h3>Analyse de la relation entre le nombre d'heures travaillées par semaine et le salaire.</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.heuresParSemaineBySalary.data}
                            layout={graphs.heuresParSemaineBySalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ce graphique est très intéressant puisqu'il nous permet de tirer 3 principales conclusions. Tout d'abord pour les classes de travail correspondants au gouvernement d'Etat et féderal, on a une corrélation entre le nombre d'heures travaillées et le salaire qui suit donc la loi de "qui travail plus touche plus". L'autre catégorie des personnes qui ne travaillent pas et qui ne touchent rien avec donc des courbes qui sont nulles et enfin l'autre grande majorité des classes de travail qui ont des courbes qui suivent plus ou moins la même loi que celle de la première catégorie </p>
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
                        <p>Sur cette carte mise à part le fait que l'on ai pas de données pour tous les pays on peut tout de même constater que seul la france et l'iran ont un salaire moyen qui tourne autour de 50 K $ par an sinon la plupart des autres pays ont un salaire moyen avoisinant les 30 K $ par an </p>
                    </div>

                    {/* Graphique 3: Tranche Salariale par Race */}
                    <div className="titreD">
                        <h3>Représentation des différentes races et sexes au sein de chaque tranche salariales</h3>
                    </div>
                    <div className="plot-container">²
                        <Plot
                            data={graphs.trancheSalary.data}
                            layout={graphs.trancheSalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Pour cette analyse on ne peut qu'avoir une conclusion choquante qui est que pour un salaire moyen supérieur ou inférieur à 50 k $ par an c'est toujours la race blanche qui touche le plus</p>
                    </div>

                    {/* Graphique 4: Capital Positif par Classe de Travail */}
                    <div className="titreD">
                        <h3>Représentation du captial par Classe de Travail</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByWorkclass.data}
                            layout={graphs.positiveCapitalByWorkclass.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Le secteur privé semble être la classe de travail qui fait rentrer le plus de capital suivi par l'auto-entrepreunariat</p>
                    </div>

                    {/* Graphique 5: Capital Positif par Niveau d'Éducation */}
                    <div className="titreD">
                        <h3>Représentation du capital par Niveau d'Éducation</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByEducation.data}
                            layout={graphs.positiveCapitalByEducation.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ici on voit bien que la plupart des personnes qui ont un capital élevé correspond à ceux qui ont un haut niveau d'étude mais on peut tout autant souligner que ce sont elles aussi qui sont le plus à même d avoir des pertes de capital</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Stat;
