import { useState, useEffect } from "react";
import "./home.scss";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "./Cards";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentReportProfiles, setRecentReportProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/abuseprofiles/12`)
      .then((response) => {
        setRecentReportProfiles(response.data.data.data);
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
    <div className="home border-r-2 border-l-2 min-h-screen mx-20 border-white/10">
      <div className="w-full number-buttons-container">
        <span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </span>
        <div className="section-1 h-screen w-full">
          <h1 className="title">Report an abusive content</h1>
          <h5 className="sub-title">
            Find and report an abusive profile in any social media. Also there
            could some more text in a couple more lines.
          </h5>
          <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="HTTPS://..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="section-2 recent-reports h-screen">
        <h2>Recent Reported accounts</h2>
        <ul>
          {recentReportProfiles.map((abuseProfile, index) => (
            <NavLink
              to="/foundresults"
              state={{ data: [abuseProfile] }}
              key={index}
            >
              <li>
                {/* <div className="profile-image" style={{ backgroundImage: `url(${abuseProfile.imageUrl || 'default-profile.png'})` }} /> */}
                <div className="profile-text">
                  {abuseProfile.profileLink}
                  <br />
                  {new Date(abuseProfile.updatedAt).toLocaleDateString()}
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
      {/* <Card></Card> */}
    </div>
  );
}

export default Home;
