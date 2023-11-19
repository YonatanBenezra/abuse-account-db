import { useState, useEffect } from "react";
import "./found-results.scss";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { extractAfterSlash, extractBeforeSlash } from "../../utils";
function FoundResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [abuseProfiles, setAbuseProfiles] = useState([]);
  const [reports, setReports] = useState([]);
  let location = useLocation();
  useEffect(() => {
    setAbuseProfiles(location.state.data);
  }, []);
  useEffect(() => {
    setReportsFunction();
  }, [abuseProfiles]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
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

      <div className="profile-cards">
        <p className="subtitle mb-3">Found {abuseProfiles.length} accounts:</p>
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
                <div className="flex flex-row items-center">
                  <span
                    className={`${
                      abuseProfile.profileLink.includes("facebook")
                        ? "facebook-logo"
                        : ""
                    }`}
                  ></span>
                  <div className="flex flex-col">
                    <span className="profile-link">
                      {extractAfterSlash(abuseProfile.profileLink)}
                    </span>
                    <span className="subtitle">{extractBeforeSlash(abuseProfile.profileLink)}</span>
                  </div>
                </div>
                <span className="report-count p-3 flex flex-col">
                  <span>{reports[index]?.data?.data?.data.length || 0}% reputation</span>
                  <span className="subtitle">{reports[index]?.data?.data?.data.length || 0} reports</span>
                </span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoundResults;
