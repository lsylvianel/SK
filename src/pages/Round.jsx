import React, { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // to go back = TGB
import { IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NumberSpinner from '../components/NumberSpinner';

function Round({ players }) {
  const navigate = useNavigate(); // TGB

  const [round, setRound] = useState(1); // round 1, 2 ...10
  const [step, setStep] = useState('bet'); // state of the round
  const [scoreboard, setScoreboard] = useState(
    players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {}) // scoreboard { "player 1":0, "player 2":0 }
  );
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
    const newScoreboard = { ...scoreboard };
    players.forEach((player) => {
      const bet = bets[player];
      var done = val[player];

      console.log("("+round+") "+"bet : "+bet+" done : "+done);
      if (bet == done) {
        if (bet == 0 && done == 0) {
          done = 1;
        }
        newScoreboard[player] += 10 * round * done ;
        console.log("("+round+") "+player+" (+) : "+newScoreboard[player]);
      } else {
        if (done == 0) {
          done = 1;
        }
        newScoreboard[player] -= 10 * round * done ;
        console.log("("+round+") "+player + " (-) : "+newScoreboard[player]);
      }
    });
    
    setScoreboard(newScoreboard);
  };

  const nextRound = () => {
    if (round < 10) {
      setRound(round + 1);
      setStep('bet');
    } else {
      navigate('/end');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* Button to go back */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
      Retour
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Manche {round}
      </Typography>

      {/* Les résultats globaux */}
      <Paper elevation={3} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Joueur</TableCell>
              <TableCell align="right">Score Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((p) => (
              <TableRow key={p}>
                <TableCell>{p}</TableCell>
                <TableCell align="right">{scoreboard[p]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography gutterBottom align="center">
        <br />{step === 'bet' ? "Contrat" : "Résultats"}
      </Typography>

      {/* On boucle sur les joueurs pour afficher les spinners */}
    <Box sx={{ my: 3 }}>
      {players.map((player) => (
        <NumberSpinner 
          key={player}
          label={player}
          value={values[player] || 0}
          bet={bets[player] || 0}
          step={step}
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