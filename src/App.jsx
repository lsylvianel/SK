import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { useState, useEffect } from 'react';
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
    try {
      const saved = localStorage.getItem('stored_scoreboard');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
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

  const playAgain = (keepPlayers) => {
    if (!keepPlayers) {
      setPlayers([]);
      setScoreboard([{
        manche: 0,
        score: players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})
      }]);
      
    } else {
      const newScoreboard = players.reduce((acc, name) => {
        acc[name] = 0;
        return acc;
      }, {});
      setScoreboard([ {manche: 0, score: newScoreboard} ]);
      localStorage.setItem('stored_scoreboard', JSON.stringify(newScoreboard));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline réinitialise les marges du navigateur pour correspondre au thème */}
      <CssBaseline />

      <Router basename="/SK">
          <Routes>
            <Route path="/"  element={<StartGame />} />
            <Route path="/players"  element={<AddPlayers players={players} setPlayers={setPlayers} />} />
            <Route path="/round"  element={<Round players={players} scoreboard={scoreboard} setScoreboard={setScoreboard} />} />
            <Route path="/start"  element={<StartGame />} />
            <Route path="/end"  element={<EndGame players={players} scoreboard={scoreboard} playAgain={playAgain}/>} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;