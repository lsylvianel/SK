import React, { useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function AddPlayers({ players, setPlayers }) {
  const [name, setName] = useState('');

  const addPlayer = () => {
    if (name.trim() !== "") {
      setPlayers([...players, name]);
      setName(''); // Clear the new field
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Stack direction="row" spacing={2}>
        <TextField 
          label="Nom du joueur" 
          variant="outlined" 
          fullWidth 
          value={name}
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
          </ListItem>
        ))}
      </List>

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="success"
          component={Link} 
          to="/round"
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