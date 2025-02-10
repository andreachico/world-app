import 'bootstrap/dist/css/bootstrap.css';

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const [continents, setContinents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const grouped = data.reduce((acc, country) => {
                    const continent = country.region || "Other";
                    if (!acc.includes(continent)) acc.push(continent);
                    return acc;
                }, []);
                setContinents(grouped);
            });
    }, []);

    return (
        <div className="homepage">
            <div className="card">
                <h1 className="title">🌍 Select a Continent</h1>
                <div className="continentList">
                    {continents.map((continent) => (
                        <button
                            key={continent}
                            onClick={() => navigate(`/continent/${continent}`)}
                            className="continentButton"
                        >
                            {continent}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;