import './App.css';
import Home from "./Components/Home"
import About from "./Components/About";
import Work from "./Components/Work";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import React,{useState,useEffect} from 'react';
import Plot from 'react-plotly.js'
import axios from 'axios'
function Accueil() {
    return (
        <div>
            <Home/>
            <About/>
            <Work/>
        </div>
    );
}
function Stat() {
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

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                {/* Définir les routes ici */}
                <Routes>
                    <Route path="/stat" element={<Stat/>}/>
                    <Route path="/" element={<Accueil/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
