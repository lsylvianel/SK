import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartParty from './pages/Start';
import AddPlayers from './pages/AddPlayers';
import Round from './pages/Round';
import EndParty from './pages/End';

function App() {
  const [players, setPlayers] = useState([]);
  return (
    <Router>
        <Routes>
           <Route path="/"  element={<StartParty />} />
           <Route path="/players"  element={<AddPlayers players={players} setPlayers={setPlayers} />} />
           <Route path="/round"  element={<Round players={players} setPlayers={setPlayers} />} />
           <Route path="/start"  element={<StartParty />} />
           <Route path="/end"  element={<EndParty players={players} setPlayers={setPlayers} />} />
        </Routes>
    </Router>
  );
}

export default App;