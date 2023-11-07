import { useState, useEffect } from "react";
import "./found-results.scss";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

function FoundResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [abuseProfiles, setAbuseProfiles] = useState([]);
  const [reports, setReports] = useState([]);
  let location = useLocation();
  console.log(location.state);
  useEffect(() => {
    setAbuseProfiles(location.state.data);
  }, []);
  useEffect(() => {
    setReportsFunction();
  }, [abuseProfiles]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(reports);
  const setReportsFunction = () => {
    abuseProfiles.map((profile) => {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/reports?abuseProfile=${
            profile._id
          }`
        )
        .then((response) => {
          setReports([...reports, response]);
        });
    });
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
        setAbuseProfiles(response.data.data.data);
        setReportsFunction();
      });
  };
  return (
    <div className="found-results">
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
        <p>We found {abuseProfiles.length} relevant profiles</p>
      </div>

      <div className="profile-cards">
        <h2>Relevant Profiles</h2>
        <div className="card-container">
          {abuseProfiles.map((abuseProfile, index) => (
            <div className="card" key={index}>
              <NavLink
                to="/profilecard"
                state={{
                  profileLink: abuseProfile.profileLink,
                  reports: reports[index]?.data?.data?.data || [],
                }}
                className="card-link"
              >
                <div className="profile-details">
                {/* <div
                  className="social-image"
                ></div> */}
                  <span className="profile-link">
                    {abuseProfile.profileLink}
                  </span>
                  <span className="report-count">
                    Number of reports:{" "}
                    {reports[index]?.data?.data?.data.length || 0}
                  </span>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoundResults;
