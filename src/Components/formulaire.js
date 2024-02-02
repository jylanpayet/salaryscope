import React, { useState } from 'react';
import Select from 'react-select';
import axios from "axios";

const countryOptions = [
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    { value: 'China', label: 'China' },
    { value: 'Australia', label: 'Australia' },
];

const educationOptions = [
    { value: '0', label: 'Level 0' },
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
];

const jobOptions = [
    // ... include all job options here using the same format
    { value: 'software_engineer', label: 'Software Engineer' },
    // etc.
];

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


    const formData = new URLSearchParams({
        country: country.value,
        education_level: education.value,
        job_title: job.value,
        race: race.value,
        gender: sex.value,
        years_of_experience: years_of_experience.value,
        age: age.value,
        senior:senior.value
    }).toString();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/prediction', {
            params: formData
        })
            .then((response) => {
                console.log('Réponse du serveur :', response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la requête :', error);
            });
    };

    return (
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
                    <label htmlFor="education">Education Level</label>
                    <Select
                        id="education"
                        placeholder="Selection d'éducation level"
                        options={educationOptions}
                        value={education}
                        onChange={setEducation}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="job">Titre de métier</label>
                    <Select
                        id="job"
                        placeholder="Selection de métier"
                        options={jobOptions}
                        value={job}
                        onChange={setJob}
                        isSearchable={true}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="race">Race</label>
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
                    <label htmlFor="senior">Senior</label>
                    <Select
                        id="senior"
                        placeholder="Statut"
                        value={senior}
                        options={SeniorOptions}
                        onChange={setSenior}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FormulaireUn;
