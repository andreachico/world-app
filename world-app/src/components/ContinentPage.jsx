import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";

function ContinentPage() {
    const { continent } = useParams();
    const [countries, setCountries] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const itemsPerPage = 10;

    const currentPage = parseInt(searchParams.get("page")) || 1;

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const filtered = data
                    .filter((country) => country.region === continent)
                    .sort((a, b) => a.name.common.localeCompare(b.name.common)); // Sorting alphabetically
                setCountries(filtered);
            });
    }, [continent]);

    const totalPages = Math.ceil(countries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleCountries = countries.slice(startIndex, endIndex);

    const goToPage = (page) => {
        setSearchParams({ page });
    };

    return (
        <div className="continent-page">
            <div className="card">
                <h1 className="title">{continent} - Countries</h1>
                <button onClick={() => navigate("/")} className="backButton">
                    ← Back to Continents
                </button>

                <div className="countryList">
                    {visibleCountries.map((country) => (
                        <Link
                            key={country.cca3}
                            to={`/country/${country.name.common}?continent=${continent}&page=${currentPage}`}
                            className="countryItem"
                        >
                            {country.name.common}
                        </Link>
                    ))}
                </div>
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => goToPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="button">
                        ← Prev
                    </button>
                    <span className="pageText">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => goToPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="button">
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { textAlign: "center", padding: "20px" },
    title: { fontSize: "28px", marginBottom: "10px" },
    backButton: { padding: "10px", backgroundColor: "#ff5733", color: "white", borderRadius: "5px", cursor: "pointer" },
    countryList: { display: "flex", flexWrap: "wrap", justifyContent: "center" },
    countryItem: { padding: "10px", margin: "5px", textDecoration: "none", color: "#333", backgroundColor: "#f9f9f9", borderRadius: "5px" },
    pagination: { marginTop: "20px" },
    button: { padding: "10px", margin: "5px", cursor: "pointer", backgroundColor: "#007bff", color: "white", borderRadius: "5px" },
    pageText: { fontSize: "16px", margin: "0 10px" },
};

export default ContinentPage;
