import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Layouts/Home";
import SavePage from "../components/Layouts/SavePage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/save" element={<SavePage />} />
      </Routes>
    </>
  );
};

export default Router;
