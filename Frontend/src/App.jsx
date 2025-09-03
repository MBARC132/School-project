import React from "react"
import AddSchool from "./components/AddSchool"
import ShowSchools from "./components/ShowSchools"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

// import viteLogo from '/vite.svg'
// import './App.css'

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/show" element={<ShowSchools />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
