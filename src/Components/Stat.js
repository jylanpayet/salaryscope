import React, {useEffect, useState} from "react"
import axios from "axios";
import BannerImage2 from "../Assets/3296160.png";
import BannerImage3 from "../Assets/user_icon-icons.com_66546.png";
import BannerImage4 from "../Assets/3788090.png";
import BannerImage5 from "../Assets/180677.png";
import BannerImage6 from "../Assets/417776.png";
import BannerImage7 from "../Assets/reglage.png";


import Plot from "react-plotly.js";

const Stat= () => {
    const [graphs, setGraphs] = useState(null);
    const [graphs2, setGraphs2] = useState(null);
    const [test,setTest] = useState(null)
    const [test2,setTest2] = useState(null);

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
        const getData2 = async () => {
            try {
                const { data } = await axios.get('/visualization2');
                setGraphs2({
                    "salary_by_gender":JSON.parse(data.salary_by_gender),
                    boxplot_salary_jobcategory: JSON.parse(data.boxplot_salary_jobcategory),
                    mean_salary_educationlevel: JSON.parse(data.mean_salary_educationlevel),
                    kde_salary_distribution: JSON.parse(data.kde_salary_distribution),
                    salary_evolution_by_age: JSON.parse(data.salary_evolution_by_age),
                    sexe_salary_distribution: JSON.parse(data.sexe_salary_distribution),
                    "experience_vs_salary":JSON.parse(data.experience_vs_salary),
                    "job_title_by_gender":JSON.parse(data.job_title_by_gender),
                    "education_vs_salary":JSON.parse(data.education_vs_salary)
                });
                console.log(data)
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
        const getStat2 = async () => {
            try {
                const { data } = await axios.get('/stats2');
                setTest2({
                    age_mean:JSON.parse(data.age_mean),
                    user_nbr:JSON.parse(data.user_nbr),
                    salary_mean:JSON.parse(data.salary_mean)
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };
        getData();
        getData2();
        getStat();
        getStat2();
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

            {graphs && graphs2 && (
                <>
                    {/* Graphique 1: Heures par Semaine par Salaire */}
                    <div className="titreD">
                        <h3>1. Analyse de la relation entre le salaire et le nombre d'heures travaillées par
                            semaine</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.heuresParSemaineBySalary.data}
                            layout={graphs.heuresParSemaineBySalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ce graphique est très intéressant car il nous permet de tirer trois conclusions principales.
                            Tout d'abord, pour les classes de travail correspondant au gouvernement d'État et fédéral,
                            nous observons une corrélation entre le nombre d'heures travaillées et le salaire, ce qui
                            confirme la notion que 'plus on travaille, plus on gagne'. Ensuite, pour la catégorie des
                            personnes qui ne travaillent pas et qui, de ce fait, ne perçoivent aucun revenu, les courbes
                            sont inexistantes. Enfin, pour la majorité des autres classes de travail, nous constatons
                            que les courbes suivent plus ou moins la même tendance que celle de la première
                            catégorie.</p></div>

                    {/* Graphique 2: Répartition des Salaires dans le Monde */}
                    <div className="titreD">
                        <h3>2. Répartition des Salaires dans le Monde</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.repartitionSalaryInTheWorld.data}
                            layout={graphs.repartitionSalaryInTheWorld.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Cette carte révèle des informations intéressantes, malgré l'absence de données pour certains
                            pays. On constate que la France et l'Iran se distinguent par un salaire moyen avoisinant les
                            50 000 $ par an. En revanche, pour la majorité des autres pays représentés, le salaire moyen
                            est plus proche des 30 000 $ par an.</p>
                    </div>

                    {/* Graphique 3: Tranche Salariale par Race */}
                    <div className="titreD">
                        <h3>3. Représentation des différentes éthnies et genres au sein des différentes tranches
                            salariales</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.trancheSalary.data}
                            layout={graphs.trancheSalary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Cette analyse conduit à une conclusion surprenante : que ce soit pour un salaire moyen
                            supérieur ou inférieur à 50 000 $ par an, c'est systématiquement la population d'éthnie
                            blanche qui perçoit le revenu le plus élevé.</p>
                    </div>

                    {/* Graphique 4: Capital Positif par Classe de Travail */}
                    <div className="titreD">
                        <h3>4. Représentation du capital en fonction de la classe de travail</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByWorkclass.data}
                            layout={graphs.positiveCapitalByWorkclass.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Il semble que le secteur privé soit la classe de travail générant le plus de capital, suivi
                            de près par l'auto-entrepreneuriat.</p>
                    </div>

                    {/* Graphique 5: Capital Positif par Niveau d'éducation*/}
                    <div className="titreD">
                        <h3>5. Représentation du capital en fonction du niveau d'éducation</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs.positiveCapitalByEducation.data}
                            layout={graphs.positiveCapitalByEducation.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ici, il est évident que les personnes possédant un capital élevé sont généralement celles
                            ayant un niveau d'études supérieur. Cependant, il est également notable que ce sont ces
                            mêmes individus qui sont le plus susceptibles de subir des pertes de capital.</p>
                    </div>
                    <div className="home-container">
                        <div className="home-banner-container">
                            <div className="home-bannerImage-container">
                            </div>
                            <div className="home-text-section">
                                <h2 className="primary-heading">
                                    En profondeur
                                </h2>
                                <p className="primary-text">
                                    Sur quelles données notre modèle se base-t-il ?  <br/> <br/> " Une source de données captivantes."
                                </p>
                                <div className="home-image-container">
                                </div>
                            </div>
                            <img src={BannerImage7} alt="" className="maImage3"/>
                        </div>
                    </div>
                    {test2 && (
                        <div className="stat-container">
                            {/* Carré 2 */}
                            <div className="stat-carré">
                                <img src={BannerImage3} alt="Description pour image 2"/>
                                <p>Participants à l'étude: <strong>{test2.user_nbr} </strong></p>
                            </div>

                            {/* Carré 1 */}
                            <div className="stat-carré">
                                <img src={BannerImage4} alt="Description pour image 1"/>
                                <p>Moyenne d'age femme: <strong>{test2.age_mean.Age["Female"].toFixed(2)} ans</strong>
                                </p>
                            </div>
                            {/* Carré 5 */}
                            <div className="stat-carré">
                                <img src={BannerImage4} alt="Description pour image 4"/>
                                <p><p>Moyenne d'age homme: <strong>{test2.age_mean.Age["Male"].toFixed(2)} ans</strong>
                                </p></p>
                            </div>


                            {/* Carré 3 */}
                            <div className="stat-carré">
                                <img src={BannerImage5} alt="Description pour image 3"/>
                                <p>Salaire moyen des Hommes: <strong>{test2.salary_mean["Male"].toFixed(2)} $</strong>
                                </p>
                            </div>
                            {/* Carré 4 */}
                            <div className="stat-carré">
                                <img src={BannerImage6} alt="Description pour image 3"/>
                                <p>Salaire moyen des Femmes: <strong>{test2.salary_mean["Female"].toFixed(2)} $</strong>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Graphique 7: Capital Positif par Niveau d'éducation*/}
                    <div className="titreD">
                        <h3>1. Visualisation des données salariales en fonction du genre</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs2.salary_by_gender.data}
                            layout={graphs2.salary_by_gender.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ce diagramme en boîte compare les salaires entre les genres masculin et féminin. Les boîtes représentent la répartition des salaires pour chaque genre, avec le bleu pour les hommes et le rouge pour les femmes. La boîte bleue montre une médiane plus élevée et une plage de salaires plus large que la boîte rouge, indiquant que les hommes ont tendance à avoir des salaires plus élevés et une plus grande variabilité dans leurs salaires. Les antennes des diagrammes en boîte suggèrent également des valeurs extrêmes plus élevées pour les hommes. Cette visualisation peut pointer vers une disparité salariale entre les genres, un sujet important dans les discussions sur l'équité sur le lieu de travail.</p>
                    </div>
                    {/* Graphique 8: boxplot_salary_jobcategory*/}
                    <div className="titreD">
                        <h3>2. Boxplot du salaire par catégories de métiers</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs2.boxplot_salary_jobcategory.data}
                            layout={graphs2.boxplot_salary_jobcategory.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ici, nous pouvons observer la répartition des salaires en fonction de chaque intitulé de poste contenu dans notre jeu de données. À travers ce graphique, nous pouvons appréhender l'étendue des salaires présents. Notre jeu de données présente donc une grande variété, d'où notre choix de l'utiliser.</p>
                    </div>
                    {/* Graphique 9: experience_vs_salary*/}
                    <div className="titreD">
                        <h3>3. Années d’Expérience vs Salaire par Niveau d’Éducation</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs2.experience_vs_salary.data}
                            layout={graphs2.experience_vs_salary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ce nuage de points montre la relation entre les années d'expérience et le salaire, coloré selon le niveau d'éducation. On observe que les points deviennent plus jaunes (niveau d'éducation plus élevé) et tendent à être plus hauts sur l'axe des salaires, ce qui suggère que les salaires augmentent avec le niveau d'éducation et l'expérience. Il y a une large dispersion des salaires à chaque niveau d'expérience, mais la tendance générale indique que l'éducation peut renforcer l'effet de l'expérience sur le salaire. Cela suggère que l'expérience professionnelle couplée à un niveau d'éducation élevé peut être un moteur important de la croissance salariale.</p>
                    </div>
                    {/* Graphique 10: experience_vs_salary*/}
                    <div className="titreD">
                        <h3>4. Une corrélation entre le niveau d'étude et le salaire</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs2.education_vs_salary.data}
                            layout={graphs2.education_vs_salary.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Le graphique en boîte montre clairement que, généralement, un niveau d'éducation plus élevé est associé à des salaires plus élevés. Les médianes de salaire augmentent avec chaque niveau d'éducation supérieur, indiquant que l'investissement dans l'éducation peut potentiellement offrir des retours financiers. La dispersion croissante des salaires à des niveaux d'éducation plus élevés suggère également une plus grande variation des rémunérations parmi les individus hautement qualifiés. Toutefois, des valeurs aberrantes à chaque niveau indiquent que d'autres facteurs peuvent influencer le salaire au-delà de l'éducation.</p>
                    </div>
                    {/* Graphique 11: job_title_by_gender*/}
                    <div className="titreD">
                        <h3>5. Répartition des genres selon les différents postes observés lors de l'étude</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs2.job_title_by_gender.data}
                            layout={graphs2.job_title_by_gender.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Ce graphique à barres illustre la répartition des genres dans différents postes professionnels, avec des barres bleues représentant les hommes et des barres rouges représentant les femmes. On remarque que certains postes sont dominés par les hommes, tandis que d'autres ont une répartition plus équilibrée ou sont dominés par les femmes. Cela peut indiquer une ségrégation professionnelle basée sur le genre ou refléter des préférences dans le choix de carrière. Les différences notables dans certains postes pourraient également mettre en évidence des questions d'égalité des chances ou de plafond de verre dans certaines industries ou professions.</p>
                    </div>

                    {/* Graphique 10: Evolution salaire avec l'age */}
                    <div className="titreD">
                        <h3>6. Ascension Salariale: L'Impact de l'Âge sur Votre Paycheck.</h3>
                    </div>
                    <div className="plot-container">
                        <Plot
                            data={graphs2.salary_evolution_by_age.data}
                            layout={graphs2.salary_evolution_by_age.layout}
                        />
                    </div>
                    <div className="commentaireD">
                        <p>Le graphique montre une courbe ascendante de la rémunération en fonction de l'âge, indiquant une tendance à l'augmentation des salaires avec l'expérience professionnelle. La croissance est plus marquée entre 20 et 40 ans, avant de ralentir vers 60 ans, ce qui suggère un plafonnement potentiel des salaires en fin de carrière. Les écarts de rémunération notables chez les travailleurs plus âgés pourraient refléter des différences de carrière ou de secteur. Cette visualisation souligne l'importance de l'ancienneté dans la progression salariale, mais nécessite un contexte plus large pour une interprétation complète.</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Stat;
