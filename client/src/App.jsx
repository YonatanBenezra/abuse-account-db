import { Route, Routes } from "react-router-dom";
import AbuseProfileForm from "./components/AbuseProfileForm/AbuseProfileForm";
import FoundResults from "./components/FoundResults/FoundResults";
import Home from "./components/Home/Home";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Navbar from "./components/navBar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/report" element={<AbuseProfileForm />}></Route>
        <Route path="/foundresults" element={<FoundResults />}></Route>
        <Route path="/profilecard" element={<ProfileCard />}></Route>
      </Routes>
    </>
  );
}

export default App;
