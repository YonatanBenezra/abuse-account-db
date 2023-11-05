import { useState, useEffect } from "react";
import "./found-results.scss";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

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
        <p>We found {abuseProfiles.length} relevant profiles</p>
      </div>

      <div className="recent-reports">
        <h2>Relevant Profiles</h2>
        <ul>
          {abuseProfiles.map((abuseProfile, index) => {
            return reports.map((report) => {
              return (
                <div>
                  <NavLink
                    to="/profilecard"
                    state={{
                      profileLink: abuseProfile.profileLink,
                      reports: report.data.data.data,
                    }}
                  >
                    {console.log(abuseProfile)}
                    <li key={index}>{abuseProfile.profileLink}</li>
                  </NavLink>
                  number of reports: {report.data.data.data.length}
                </div>
              );
            });
          })}
        </ul>
      </div>
    </div>
  );
}

export default FoundResults;
