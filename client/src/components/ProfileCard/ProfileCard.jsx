import React, { useState, useEffect } from "react";
import "./profile-card.scss"; // Make sure this is correctly pointing to your SCSS file
import { useLocation } from "react-router-dom";

function FoundResults() {
  const [reports, setReports] = useState([]);
  const percentages = [25, 50, 75, 100];

  let location = useLocation();

  useEffect(() => {
    setReports(location.state.reports);
  }, [location.state.reports]);

  return (
    <div className="report-card-container">
      {/* The search bar is commented out, but I'm leaving it in case you want to use it later */}
      {/* <div className="search-bar">
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
      </div> */}

      <h1 className="home__title">{location?.state?.profileLink}</h1>
      <div>
          <div
            className="half-arc"
            style={{ "--percentage": `${reports.length/2}%` }}
          >
            <span className="label">Danger level:
            <br/>
             {reports.length} Report
            <br/>
              {reports.length < 10 ? "low" : reports.length < 25 ? "medium" : "High"}
             </span>
          </div>
      </div>
      {reports.length > 0 ? (
        reports.map((report, index) => (
          <div className="report-card" key={index}>
            <h3 className="report-card__heading">Categories</h3>
            <ul className="report-card__categories">
              {report.categories.map((category, index) => (
                <li key={index} className="report-card__category">
                  {category}
                </li>
              ))}
            </ul>
            <h3 className="report-card__heading">Comment</h3>
            <p className="report-card__comment">{report.comment}</p>
            <h3 className="report-card__heading">Link to Abusive Post</h3>
            <a href={report.linkToPost} className="report-card__link">
              {report.linkToPost}
            </a>
          </div>
        ))
      ) : (
        <p className="home__no-reports">No reports found.</p>
      )}
    </div>
  );
}

export default FoundResults;
