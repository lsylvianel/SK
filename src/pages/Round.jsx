import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // to go back = TGB
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import NumberSpinner from '../components/NumberSpinner';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function Round({ players, scoreboard, setScoreboard}) {
  const MAX_ROUND = 10;
  const navigate = useNavigate(); // TGB

  const [round, setRound] = useState(1); // round 1, 2 ...10
  const [step, setStep] = useState('bet'); // state of the round

  const [values, setValues] = useState(
    players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {}) // bet display on spinner
  ); 
  const [bets, setBets] = useState(
    players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {}) // bet for each player
  );
  
  const resetValues = () => {
    return players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
  };

  const validateRound = () => {
    if (step == 'bet') {
      setStep('result');
      setBets(values)
      setValues(resetValues()); // empty bets
    } else {
      setValues(resetValues());
      calculate(values);
      nextRound();
    }
  };

  const validateValues = (player, itsBet) => {
    setValues({
      ...values,
      [player]: itsBet
    })
  }

  const calculate = (val) => {
    setScoreboard((prevScoreboard) => {
      const nextScoreboard = { ...prevScoreboard };
      players.forEach((player) => {
        const bet = bets[player];
        let done = val[player];
        let score = 0;

        console.log("("+round+") "+"bet : "+bet+" done : "+done);
        if (bet == done) {
          if (bet == 0 && done == 0) {
            done = 1;
          }
          score = (nextScoreboard[player] || 0) + 10 * round * done ;
          console.log("("+round+") "+player+" (+) : "+nextScoreboard[player]);
        } else {
          if (done == 0) {
            done = 1;
          }
          score = (nextScoreboard[player] || 0) - 10 * round * done ;
          console.log("("+round+") "+player + " (-) : "+nextScoreboard[player]);
        }
        nextScoreboard[player] = score;
      });
    
      return nextScoreboard;
    });
  };

  const nextRound = () => {
    if (round < MAX_ROUND) {
      setRound(round + 1);
      setStep('bet');
    } else {
      navigate('/end');
    }
  };

  const [openCancelButton, setOpenCancelButton] = useState(false);
  const [openScores, setOpenScores] = useState(false);

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Cancel game */}
        <Button startIcon={<CancelIcon />} sx={{ mb: 2 }} onClick={() => setOpenCancelButton(true)}></Button>
        <Dialog open={openCancelButton} onClose={() => setOpenCancelButton(false)}>
          <DialogTitle>Etes-vous sûr de vouloir abandonner?</DialogTitle>
          <DialogContent>
            {
              <button onClick={() => navigate('/End')}>
                Quitter
              </button>
            }
          </DialogContent>
        </Dialog>

        {/* Score grid */}
        <Button startIcon={<FormatListBulletedIcon />} sx={{ mb: 2 }} onClick={() => setOpenScores(true)}></Button>
        <Dialog open={openScores} onClose={() => setOpenScores(false)}>
          <DialogTitle>Liste des scores</DialogTitle>
          <DialogContent>
            {
              <Table>
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell align="center"><strong>Manche</strong></TableCell>
            {/* On boucle pour créer les en-têtes avec les noms */}
            {players.map((player) => (
              <TableCell key={player} align="center" sx={{ fontWeight: 'bold' }}>
                {player}
              </TableCell>
            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                        </TableBody>
                      </Table>
            }
          </DialogContent>
        </Dialog>
      </Box>

      <Typography variant="h4" align="center" gutterBottom>
        Manche {round}
      </Typography>

      {/* Game results */}
      <Paper elevation={3} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            {/* On boucle pour créer les en-têtes avec les noms */}
            {players.map((player) => (
              <TableCell key={player} align="center" sx={{ fontWeight: 'bold' }}>
                {player}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* On boucle pour afficher le score correspondant à chaque nom */}
            {players.map((player) => (
              <TableCell key={player} align="center">
                {scoreboard[player] || 0}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      </Paper>

      <Typography gutterBottom align="center">
        <br />{step === 'bet' ? "Contrats" : "Résultats"}
      </Typography>

      {/* Display spinner for each player */}
    <Box sx={{ my: 3 }}>
      {players.map((player) => (
        <NumberSpinner 
          key={player}
          label={player}
          value={values[player] || 0}
          bet={bets[player] || 0}
          step={step}
          round={round}
          onChange={(val) => validateValues(player, val) }
        />
      ))}
    </Box>

    {/* Ton bouton unique qui gère tout */}
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mt: 4 }} 
        onClick={validateRound}
      >
        {step === 'bet' ? "Valider les paris" : "Valider les résultats"}
      </Button>
    </Container>
  );
}

export default Round;