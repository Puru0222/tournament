import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginSignupComp from "./component/LoginSignupComp";

const App = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginSignup" element={<LoginSignupComp />} />
      </Routes>
    </div>
  );
};

export default App;
