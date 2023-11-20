import { Navigate, Route, Routes } from "react-router-dom";
import AbuseProfileForm from "./components/AbuseProfileForm/AbuseProfileForm";
import FoundResults from "./components/FoundResults/FoundResults";
import Home from "./components/Home/Home";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Navbar from "./components/navBar/Navbar";
// import Signup from "./components/Auth/SignUp";
// import Login from "./components/Auth/Login";
import About from "./components/About/About";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<Home></Home>} exact />
        <Route path="/report" element={<AbuseProfileForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}></Route>
        <Route path="/foundresults" element={<FoundResults />}></Route>
        <Route path="/profilecard" element={<ProfileCard />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/howitworks" element={<HowItWorks />}></Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
}

export default App;
