import React, { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // to go back = TGB
import { IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Round({ players }) {
  const navigate = useNavigate(); // TGB
  const [manche, setManche] = useState(1);
  // On crée un objet pour stocker les scores : { "Joueur 1": 0, "Joueur 2": 0 }
  const [scores, setScores] = useState(
    players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})
  );

  const validateRound = () => {
    if (manche < 10) {
      setManche(manche + 1);
    } else {
      navigate('/end');
    }
    // Ici on ajoutera plus tard la logique pour saisir les points
    // il faudrait un petit bouton pour quitter si on veut abandonner la partie?
  };

  return (
    <Container sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
  <IconButton onClick={() => navigate(-1)} color="primary">
    <ArrowBackIcon />
  </IconButton>
  <Typography variant="h6">Configuration</Typography>
</Box>
        <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} // 3. "-1" signifie "recule d'une page"
        sx={{ mb: 2 }}
      >
        Retour
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        Manche {manche}
      </Typography>

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
                <TableCell align="right">{scores[p]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mt: 4 }} 
        onClick={validateRound}
      >
        {manche < 10 ? `Terminer la manche ${manche}` : "Fin de la partie"}
      </Button>
    </Container>
  );
}

export default Round;