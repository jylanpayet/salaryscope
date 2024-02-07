import React, { useState } from 'react';
import Select from 'react-select';
import axios from "axios";
import {FiArrowRight} from "react-icons/fi";
import { Navigate } from 'react-router-dom';

const countryOptions = [
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    { value: 'China', label: 'China' },
    { value: 'Australia', label: 'Australia' },
];

const educationOptions = [
    { value: '0', label: 'Bac' },
    { value: '1', label: 'Bac +3 / Licence / BUT ...' },
    { value: '2', label: 'Bac +5 / Master / École ...' },
    { value: '3', label: 'Doctorant' },
];

const convertedJobOptions = [
    "Software Engineer",
    "Data Analyst",
    "Manager",
    "Sales Associate",
    "Director",
    "Marketing Analyst",
    "Product Manager",
    "Sales Manager",
    "Marketing Coordinator",
    "Scientist",
    "Software Developer",
    "HR Manager",
    "Financial Analyst",
    "Project Manager",
    "Customer Service Rep",
    "Operations Manager",
    "Marketing Manager",
    "Engineer",
    "Data Entry Clerk",
    "Sales Director",
    "Business Analyst",
    "VP of Operations",
    "IT Support",
    "Recruiter",
    "Financial Manager",
    "Social Media Specialist",
    "Software Manager",
    "Developer",
    "Consultant",
    "Product Designer",
    "CEO",
    "Accountant",
    "Data Scientist",
    "Marketing Specialist",
    "Technical Writer",
    "HR Generalist",
    "Project Engineer",
    "Customer Success Rep",
    "Sales Executive",
    "UX Designer",
    "Operations Director",
    "Network Engineer",
    "Administrative Assistant",
    "Strategy Consultant",
    "Copywriter",
    "Account Manager",
    "Director of Marketing",
    "Help Desk Analyst",
    "Customer Service Manager",
    "Business Intelligence Analyst",
    "Event Coordinator",
    "VP of Finance",
    "Graphic Designer",
    "UX Researcher",
    "Social Media Manager",
    "Director of Operations",
    "Digital Marketing Manager",
    "IT Manager",
    "Customer Service Representative",
    "Business Development Manager",
    "Web Developer",
    "Research Director",
    "Technical Support Specialist",
    "Creative Director",
    "Human Resources Director",
    "Content Marketing Manager",
    "Technical Recruiter",
    "Sales Representative",
    "Chief Technology Officer",
    "Designer",
    "Financial Advisor",
    "Principal Scientist",
    "Supply Chain Manager",
    "Training Specialist",
    "Research Scientist",
    "Public Relations Manager",
    "Operations Analyst",
    "Product Marketing Manager",
    "Project Coordinator",
    "Chief Data Officer",
    "Digital Content Producer",
    "IT Support Specialist",
    "Customer Success Manager",
    "Software Project Manager",
    "Supply Chain Analyst",
    "Office Manager",
    "Principal Engineer",
    "Sales Operations Manager",
    "Web Designer",
    "Director of Sales",
    "Customer Support Specialist",
    "Director of Human Resources",
    "Director of Product Management",
    "Human Resources Manager",
    "Business Development Associate",
    "Researcher",
    "HR Coordinator",
    "Director of Finance",
    "Human Resources Coordinator",
    "IT Project Manager",
    "Quality Assurance Analyst",
    "Director of Sales and Marketing",
    "Account Executive",
    "Director of Business Development",
    "Human Resources Specialist",
    "Director of Human Capital",
    "Advertising Coordinator",
    "Marketing Director",
    "IT Consultant",
    "Business Operations Analyst",
    "Product Development Manager",
    "Software Architect",
    "HR Specialist",
    "Data Engineer",
    "Operations Coordinator",
    "Director of HR",
    "Director of Engineering",
    "Software Engineer Manager",
    "Back end Developer",
    "Full Stack Engineer",
    "Front end Developer",
    "Front End Developer",
    "Director of Data Science",
    "Juniour HR Generalist",
    "Juniour HR Coordinator",
    "Digital Marketing Specialist",
    "Receptionist",
    "Social Media Man",
    "Delivery Driver"
];

const jobOptions = convertedJobOptions.map((job) => ({
    value: job,
    label: job
}));
const raceOptions = [
    { value: 'White', label: 'White' },
    { value: 'Asian', label: 'Asian' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Australian', label: 'Australian' },
    { value: 'Welsh', label: 'Welsh' },
    { value: 'African American', label: 'African American' },
    { value: 'Mixed', label: 'Mixed' },
    { value: 'Black', label: 'Black' }
];

const sexOptions = [
    { value: 'Male', label: 'Homme' },
    { value: 'Female', label: 'Femme' },
];

const AgeOptions = Array.from({ length: 101 }, (_, index) => ({
    value: index,
    label: index.toString(),
}));

const SeniorOptions = [
    { value: '0', label: 'Debutant' },
    { value: '1', label: 'Senior' },
];

function FormulaireUn() {
    const [country, setCountry] = useState('');
    const [education, setEducation] = useState('');
    const [job, setJob] = useState('');
    const [race, setRace] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [years_of_experience, setAgeXP] = useState('');
    const [senior, setSenior] = useState('');
    const [redirectTo, setRedirectTo] = useState(null);


    const formData = new URLSearchParams({
        country: country.value,
        education_level: education.value,
        job_title: job.value,
        race: race.value,
        gender: sex.value,
        years_of_experience: years_of_experience.value,
        age: age.value,
        senior:senior.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.get('/prediction', {
            params: formData
        })
            .then((response) => {
                const salaire = response.data.Prediction;
                // Inclure toutes les données du formulaire et le salaire dans l'objet de redirection
                setRedirectTo({
                    pathname: `/resultat`,
                    state: {
                        salaire: salaire,
                        country: country.value,
                        education_level: education.value,
                        job_title: job.value,
                        race: race.value,
                        gender: sex.value,
                        years_of_experience: years_of_experience.value,
                        age: age.value,
                        senior: senior.value
                    }
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la requête :', error);
            });
    };

    if (redirectTo) {
        return <Navigate to={redirectTo.pathname} state={redirectTo.state} replace={true} />;
    }

    return (
        <div>
            <p className="coucou">Veuillez remplir le formulaire ci-dessous, les données doivent être précises pour un résultat optimal. </p>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="country">Pays</label>
                        <Select
                            id="country"
                            placeholder="Selection de pays"
                            options={countryOptions}
                            value={country}
                            onChange={setCountry}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="education">Niveau</label>
                        <Select
                            id="education"
                            placeholder="Diplôme"
                            options={educationOptions}
                            value={education}
                            onChange={setEducation}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="job">Titre du métier</label>
                        <Select
                            id="job"
                            placeholder="Selection du métier"
                            options={jobOptions}
                            value={job}
                            onChange={setJob}
                            isSearchable={true}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="race">Éthnie</label>
                        <Select
                            id="race"
                            placeholder="Selection d'éthnie"
                            options={raceOptions}
                            value={race}
                            onChange={setRace}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sex">Sexe</label>
                        <Select
                            id="sex"
                            placeholder="Genre"
                            options={sexOptions}
                            value={sex}
                            onChange={setSex}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <Select
                            id="age"
                            placeholder="Age"
                            options={AgeOptions}
                            value={age}
                            onChange={setAge}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="years_of_experience">Année d'expérience</label>
                        <Select
                            id="years_of_experience"
                            placeholder="Année"
                            value={years_of_experience}
                            options={AgeOptions}
                            onChange={setAgeXP}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senior">Ancienneté</label>
                        <Select
                            id="senior"
                            placeholder="Statut"
                            value={senior}
                            options={SeniorOptions}
                            onChange={setSenior}
                        />
                    </div>
                    <button type="submit">Submit <FiArrowRight/></button>
                </form>
            </div>
        </div>
    );
}

export default FormulaireUn;
