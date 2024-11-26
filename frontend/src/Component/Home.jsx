import React, { useState } from 'react';
import { Card, Button, Typography, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Home = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'NDA', votes: 0 },
    { id: 2, name: 'INC', votes: 0 },
    { id: 3, name: 'APP', votes: 0 },
  ]);

  const [hasVoted, setHasVoted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleVote = (id) => {
    if (hasVoted) {
      setOpenSnackbar(true);
      return;
    }
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
    );
    setCandidates(updatedCandidates);
    setHasVoted(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Voting Interface
      </Typography>
      {candidates.map((candidate) => (
        <Card
          key={candidate.id}
          sx={{
            padding: '15px',
            margin: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">{candidate.name}</Typography>
          <Typography variant="body1">Votes: {candidate.votes}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleVote(candidate.id)}
            disabled={hasVoted}
          >
            Vote
          </Button>
        </Card>
      ))}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          You can only vote once!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Home;
