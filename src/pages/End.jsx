import React, { useState } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import  { Link } from 'react-router-dom'

function EndGame({ players, scoreboard }) {
  const rankedPlayers = players
  .map(name => ({
    name: name,
    score: scoreboard[name] || 0
  }))
  .sort((a, b) => b.score - a.score);

  const resetGame = (players = false, keepPlayers = false) => {
    setScoreboard({});
    setPlayers(players);
    
    if (!keepPlayers) {
      setPlayers([]);
    }
  };

  return (    
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      {/* Game ranking */}
      <Paper elevation={3} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell align="center"><strong>Rang</strong></TableCell>
              <TableCell><strong>Joueur</strong></TableCell>
              <TableCell align="right"><strong>Score</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankedPlayers.map((player, index) => (
              <TableRow key={player.name}>
                <TableCell align="center">
                  {index === 0 ? "🥇 1e" : index === 1 ? "🥈 2e" : index === 2 ? "🥉 3e" : index + 1 + "e"}
                </TableCell>
                <TableCell sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                  {player.name}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {player.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button 
        variant="contained" component={Link}
        to="/round"
        onClick={() => resetGame(players, false)}
        fullWidth 
      >
        Rejouer
      </Button>
      <Button 
        variant="contained" component={Link}
        to="/start"
        onClick={() => resetGame(true)}
        fullWidth 
      >
        Quitter
      </Button>
    </Container>
  );
}

export default EndGame;