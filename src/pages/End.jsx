import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import  { Link } from 'react-router-dom'

function EndParty({ players }) {
  const [manche, setManche] = useState(1);
  // On crée un objet pour stocker les scores : { "Joueur 1": 0, "Joueur 2": 0 }
  const [scores, setScores] = useState(
    players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})
  );

  return (

    // scores array
    
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Button 
        variant="contained" component={Link}
        to="/start"
        fullWidth 
      >
        Quitter
      </Button>
    </Container>
  );
}

export default EndParty;