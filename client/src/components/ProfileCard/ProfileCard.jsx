import React, { useState, useEffect } from "react";
import "./profile-card.scss"; // Make sure this is correctly pointing to your SCSS file
import { useLocation } from "react-router-dom";
import { formatDate } from "../../utils";
import { extractAfterSlash } from "../../utils";
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
        <div className="information-reputation-container">
          <div className="profile-information">
            <h6 className="mb-3">Profile information</h6>
            <hr />
            <div className="mt-3 mb-3">
              <span>Info #1</span>
              <span className="text-white ml-20">Text Here</span>
            </div>
            <div className="mb-3">
              <span>Info #2</span>
              <span className="text-white ml-20">Text Here</span>
            </div>
            <div className="mb-3">
              <span>Info #3</span>
              <span className="text-white ml-20">Text Here</span>
            </div>
            <div className="mb-3">
              <span>Info #4</span>
              <span className="text-white ml-20">Text Here</span>
            </div>
          </div>
          <div className="reputation">
            <h6>Reputation level</h6>
            <hr />
            <div className="progress-bar-container">
              <div className="progress-bar">
                <span
                  className="white-line"
                  style={{ left: `${reports.length}%` }}
                >
                  <span className="reports-number">{reports.length}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="mt-3 mb-3">Recent Reports ({reports.length})</h1>
          <div className="reports-container">
            <div className="grey-row rounded-t-2xl">
              <span className="w-44 inline-block">Reporter</span>
              <span className="w-32 inline-block">Date</span>
              <span className="w-80 inline-block">Comment</span>
              <span className="w-80 inline-block">Categories</span>
              <span className="w-5 inline-block"></span>
            </div>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <div key={index} className="h-14 flex overflow-hidden p-3 row">
                  <span className="w-44 inline-block overflow-hidden mr-1">
                    {extractAfterSlash(report.abuseProfile.profileLink)}
                  </span>
                  <span className="w-32 inline-block overflow-hidden mr-1">
                    {formatDate(report.abuseProfile.updatedAt)}
                  </span>
                  <span className="w-80 inline-block overflow-hidden mr-1">
                    {report.comment}
                  </span>
                  <span className="w-80 inline-block overflow-hidden mr-1">
                    {report.categories.map(
                      (category, index) => `${category}, `
                    )}
                  </span>
                  <a
                    className="w5 inline-block overflow-hidden mr-1 external-link"
                    href={report.linkToPost}
                  >
                  </a>
                </div>
              ))
            ) : (
              <p className="home__no-reports">No reports found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="profile-claim mt-3 p-3 flex flex-col items-center">
        <h5 className="text-white mb-1">Is this your profile?</h5>
        <h6 className="mb-2">
          You may request to takedown any associated reports. We will attempt to
          verify your ownership.
        </h6>
        <div className="verify-button cursor-pointer">Verify ownership</div>
      </div>
    </div>
  );
}

export default FoundResults;
