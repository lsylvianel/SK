import React from 'react';
import { Button, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/SK_logo.jpg';

function StartGame() {
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      {/* Display logo */}
      <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />

      {/* Use button from material UI */}
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button 
          variant="contained" component={Link} 
          to="/players" 
          size="large"
        >
          Règles classiques
        </Button>
        <Button variant="outlined" size="large">
          Règles spéciales
        </Button>
      </Stack>
    </Container>
  );
}

export default StartGame;