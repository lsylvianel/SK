import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function NumberSpinner({ label, value, bet, step, round, onChange }) {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Player name */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {label} 
          {step === 'result' && (
            <Box component="span" sx={{ fontWeight: 'normal', ml: 1, color: 'text.secondary' }}>
              ({bet})
            </Box>
          )}
        </Typography>
        
        {/* Spinner */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: '#f5f5f5', 
          borderRadius: 2,
          p: 0.5
        }}>
          <IconButton 
            onClick={() => onChange(value - 1)} 
            disabled={value <= 0}
            size="small"
          >
            <RemoveIcon />
          </IconButton>
          
          <Typography sx={{ width: '40px', textAlign: 'center', fontWeight: 'bold' }}>
            {value}
          </Typography>

          <IconButton 
            onClick={() => onChange(value + 1)} 
            disabled={value >= round}
            color="primary"
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>

      </Box>
    </Paper>
  );
}

export default NumberSpinner;