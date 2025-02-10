import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

function CountryDetails() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const continent = searchParams.get("continent") || "";
    const page = searchParams.get("page") || 1;
    const [country, setCountry] = useState(null);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setCountry(data[0]);
                }
            })
            .catch((error) => console.error("Error fetching country data:", error));
    }, [name]);

    if (!country) {
        return <h2 className="loading">Loading country details...</h2>;
    }

    return (
        <div className="country-details">
            <button onClick={() => navigate(`/continent/${continent}?page=${page}`)} className="backButton">
                ← Back to {continent}
            </button>
            <div className="card">
                <h1 className="title">{country.name.common}</h1>
                <img src={country.flags.svg} alt={country.name.common} className="flag" />

                <div className="details">
                    <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default CountryDetails;
