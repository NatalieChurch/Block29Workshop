import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AllPlayers from './components/AllPlayers'
import SinglePlayer from './components/SinglePlayer'
import NewPlayer from './components/NewPlayerForm'
import SearchBar from './components/SearchBar'

function App() {




  return (
  <div>

    <div id="nav" style={{display:"flex", justifyContent:"space-between"}}>
      <Link to="/">Home</Link>
      <Link to="/players">All Players</Link>
      <Link to="/newplayer">New Player Form</Link>
      <Link to="/search">Search</Link>
    </div>

    <div id="main-section">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/players" element={<AllPlayers/>}/>
        <Route path="/players/:id" element={<SinglePlayer/>}/>
        <Route path="/newplayer" element={<NewPlayer/>}/>
        <Route path="/search" element={<SearchBar/>} />
      </Routes>
    </div>
    
  </div>
  )

}

export default App
