import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartGame from './pages/Start';
import AddPlayers from './pages/AddPlayers';
import Round from './pages/Round';
import EndGame from './pages/End';

function App() {
  const [players, setPlayers] = useState([]);
  const [scoreboard, setScoreboard] = useState(
    players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {}) // scoreboard { "player 1":0, "player 2":0 }
  );
  <Round 
    players={players} 
    scoreboard={scoreboard} 
    setScoreboard={setScoreboard}
  />

  return (
    <Router basename="/SK">
        <Routes>
           <Route path="/"  element={<StartGame />} />
           <Route path="/players"  element={<AddPlayers players={players} setPlayers={setPlayers} />} />
           <Route path="/round"  element={<Round players={players} scoreboard={scoreboard} setScoreboard={setScoreboard} />} />
           <Route path="/start"  element={<StartGame />} />
           <Route path="/end"  element={<EndGame players={players} scoreboard={scoreboard} />} />
        </Routes>
    </Router>
  );
}

export default App;