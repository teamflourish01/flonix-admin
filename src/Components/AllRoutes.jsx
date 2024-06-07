import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Protected from "./Protected";
import Admin from "./Admin";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <Protected>
            <Admin />
          </Protected>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
