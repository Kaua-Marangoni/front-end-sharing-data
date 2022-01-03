import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ControlPrivate from "../ControlPrivate"
import EditUser from "../EditUser"
import Home from "../Home"
import Users from "../Users"
import PrivateRoute from "./privateRoute"

const RoutesApplication = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route
          path="/private18"
          element={
            <PrivateRoute>
              <ControlPrivate />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default RoutesApplication
