import { useState, useEffect } from "react";
import "./home.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentReportProfiles, setRecentReportProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/abuseprofiles/12`
      )
      .then((response) => {
        setRecentReportProfiles(response.data.data.data)
      });
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/abuseprofiles?profileLink=regex:${searchTerm}`
      )
      .then((response) => {
        navigate("/foundresults", { state: { data: response.data.data.data } });
      });
  };
  return (
    <div className="home">
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search abuse profiles..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="explanation-container">
        <p>
          Search and report abusive profiles easily.
          <p>Help us maintain a respectful community.</p>
        </p>
      </div>

      <div className="recent-reports">
        <h2>Recent Reports</h2>
        <ul>
          {recentReportProfiles.map((abuseProfile, index) => (
            <li key={index}>
              {abuseProfile.profileLink}
              <br />
              {abuseProfile.updatedAt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
