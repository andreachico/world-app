import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import CountryDetails from "./components/CountryDetails";
import ContinentPage from "./components/ContinentPage";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/continent/:continent" element={<ContinentPage />} />
                    <Route path="/country/:name" element={<CountryDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;