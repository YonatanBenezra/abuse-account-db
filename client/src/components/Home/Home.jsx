import { useState, useEffect } from "react";
import "./home.scss";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "./Cards";
import { Link, animateScroll as scroll } from "react-scroll";
function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentReportProfiles, setRecentReportProfiles] = useState([]);
  const [numberPressed, setNumberPressed] = useState(1);
  const navigate = useNavigate();
  const [numOfReports, setNumOfReports] = useState({});

  const getNumOfReports = async (abuseProfileId) => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/abuseprofiles/reportsnum/${abuseProfileId}`
    );
    return res.data;
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const section1Top = document.getElementById("hero").offsetTop;
      const section2Top =
        document.getElementById("reported-accounts").offsetTop;
      console.log(position+95);
      console.log(section2Top);
      if (position+101 < section2Top) {
        console.log("here")
        setNumberPressed(1);
      } else if (position+100 >= section2Top) {
        console.log("here2")
        setNumberPressed(2);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (recentReportProfiles.length === 0) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/abuseprofiles/12`)
        .then((response) => {
          setRecentReportProfiles(response.data.data.data);
        });
    }
  }, []);

  useEffect(() => {
    if (recentReportProfiles.length > 0) {
      recentReportProfiles.forEach((abuseProfile) => {
        if (!numOfReports[abuseProfile._id]) {
          const fetchNumOfReports = async () => {
            const data = await getNumOfReports(abuseProfile._id);
            setNumOfReports((prevState) => ({
              ...prevState,
              [abuseProfile._id]: data,
            }));
          };
          fetchNumOfReports();
        }
      });
    }
  }, [recentReportProfiles, getNumOfReports, numOfReports]);

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
    <div className="home border-r-2 border-l-2 min-h-screen border-white/10 md:mx-10 mx-5">
      <div className="w-full number-buttons-container">
        <span className="number-buttons">
          <Link
            activeClass="active"
            to="hero"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={`border-2 rounded-full p-1 number-button cursor-pointer ${
              numberPressed !== 1 && "text-white/20 border-white/20"
            }`}
            onClick={() => setNumberPressed(1)}
          >
            1
          </Link>
          <Link
            activeClass="active"
            to="reported-accounts"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={`border-2 rounded-full p-1 number-button cursor-pointer ${
              numberPressed !== 2 && "text-white/20 border-white/20"
            }`}
            onClick={() => setNumberPressed(2)}
          >
            2
          </Link>
          {/* <Link
            activeClass="active"
            to="hero"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={`border-2 rounded-full p-1 number-button cursor-pointer ${
              numberPressed !== 3 && "text-white/20 border-white/20"
            }`}
            onClick={() => setNumberPressed(3)}
          >
            3
          </Link> */}
        </span>
        <div className="section-1 h-screen w-full" id="hero">
          <h1 className="title">REPORT AN ABUSIVE ACCOUNT</h1>
          <h5 className="sub-title text-white/50 mb-6">
            Find and report an abusive profile in any social media. Also there
            could some more text in a couple more lines.
          </h5>
          <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="https://"
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

      <div className="section-2 recent-reports h-screen" id="reported-accounts">
        <h1 className="title mb-6">RECENTLY REPORTED</h1>
        <h5 className="sub-title text-white/50 mb-6">
          The list of recently reported accounts.
        </h5>{" "}
        <ul>
          {recentReportProfiles.map((abuseProfile, index) => (
            <NavLink
              to="/foundresults"
              state={{ data: [abuseProfile] }}
              key={index}
            >
              <li>
                <div
                  className={`profile-image ${
                    abuseProfile.profileLink.includes("facebook") &&
                    "facebook-logo"
                  }`}
                />
                <div className="profile-text">
                  {numOfReports[abuseProfile._id]} Reports on profile
                  <br />
                  {abuseProfile.profileLink.replace("facebook.com/", "")}
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
