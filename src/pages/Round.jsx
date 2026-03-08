import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // to go back = TGB
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import NumberSpinner from '../components/NumberSpinner';
import { getTotal, ScoreModal } from './ScoreTable';

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

  // save scoreboard at each round
  useEffect(() => {
    localStorage.setItem('stored_scoreboard', JSON.stringify(scoreboard));
  }, [scoreboard]);

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
    const performedScores = {};

    players.forEach((player) => {
      const bet = Number(bets[player]);
      const done = Number(val[player]);

      if (bet === done) {
        const multiplicateur = (done === 0) ? 1 : done;
        performedScores[player] = 10 * round * multiplicateur;
      } else {
        const ecart = Math.abs(bet - done);
        performedScores[player] = -10 * round * ecart;
      }
    });

    const newEntry = { manche: round, score: performedScores };
    setScoreboard((prev) => [...prev, newEntry]);
  };

  const nextRound = () => {
    if (round == MAX_ROUND && step == "result") {
      navigate('/end');
    } else {
      setRound(round + 1);
      setStep('bet');
    }
  };

  const [openCancelButton, setOpenCancelButton] = useState(false);

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
        <ScoreModal players={players} scoreboard={scoreboard} />
        {/* <Button startIcon={<FormatListBulletedIcon />} sx={{ mb: 2 }} onClick={() => setOpenScores(true)}></Button>
        <Dialog open={openScores} onClose={() => setOpenScores(false)}>
          <DialogTitle>Liste des scores</DialogTitle>
          <DialogContent>
            {
              <ScoreTable players={players} scoreboard={scoreboard} />
            }
          </DialogContent>
        </Dialog>*/}
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
                {getTotal(player, scoreboard)}
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