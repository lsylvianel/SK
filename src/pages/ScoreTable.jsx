import { Button, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const getTotal = (player, scoreboard) => {
  if (!Array.isArray(scoreboard)) return 0;
  return scoreboard.reduce((acc, row) => acc + (row.score[player] || 0), 0);
};

export const ScoreModal = ({ players, scoreboard }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button startIcon={<FormatListBulletedIcon />} sx={{ mb: 2 }} onClick={() => setOpen(true)}></Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Historique des manches</DialogTitle>
        <DialogContent>
            <ScoreTable players={players} scoreboard={scoreboard} />
            <Button onClick={() => setOpen(false)}>Fermer</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ScoreTable = ({ players, scoreboard }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {players.map(p => <TableCell key={p} align="center">{p}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreboard.map((row) => (
            <TableRow key={row.manche}>
              <TableCell>Manche {row.manche}</TableCell>
              {players.map(p => (
                <TableCell key={p} align="center">{row.score[p] || 0}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};