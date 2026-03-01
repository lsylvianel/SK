import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // to go back = TGB
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

function AddPlayers({ players, setPlayers }) {
  const navigate = useNavigate(); // TGB
  const MIN_PLAYERS = 2;
  const MAX_PLAYERS = 8;
  const [name, setName] = useState('');

  const addPlayer = () => {
    if (name.trim() !== "") {
      setPlayers([...players, name]);
      setName(''); // Clear the new field
    }
  };

  const deletePlayer = (indexToDelete) => {
    const updatedPlayers = players.filter((_, index) => index !== indexToDelete);
    setPlayers(updatedPlayers);
  }

  return (
    <Container sx={{ mt: 5 }}>
      {/* Button to go back */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/start')}
        sx={{ mb: 2 }}
      >
      Retour
      </Button>

      <Stack direction="row" spacing={2}>
        <TextField 
          label={players.length >= MAX_PLAYERS ? "Maximum atteint" : "Nom du joueur"} 
          variant="outlined" 
          fullWidth 
          value={name}
          disabled={players.length >= MAX_PLAYERS}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
        />
        <Button 
          variant="contained" 
          onClick={addPlayer} 
          startIcon={<AddCircleIcon />}
        >
          Ajouter
        </Button>
      </Stack>

      <List sx={{ mt: 3 }}>
        {players.map((p, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={p} />
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => deletePlayer(index)}
                color="error"
                >
              <CloseIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="success"
          component={Link} 
          to="/round"
          disabled={players.length < MIN_PLAYERS}
          startIcon={<PlayArrowIcon />}
          sx={{ mt: 4 }}
        >
          Lancer la partie
        </Button>
      </Stack>
    </Container>
  );
}

export default AddPlayers;