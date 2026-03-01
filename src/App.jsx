import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartGame from './pages/Start';
import AddPlayers from './pages/AddPlayers';
import Round from './pages/Round';
import EndGame from './pages/End';

function App() {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('stored_players');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [scoreboard, setScoreboard] = useState(() => {
    const saved = localStorage.getItem('stored_scoreboard');
    return saved ? JSON.parse(saved) : players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
  });

  // write in localStorage at each modification
  useEffect(() => {
    localStorage.setItem('stored_players', JSON.stringify(players));
    localStorage.setItem('stored_scoreboard', JSON.stringify(scoreboard));
  }, [players, scoreboard]);

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