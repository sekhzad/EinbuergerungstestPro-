// support.js
// this item on the left of buttom area  , where are Instagram and contact 
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Support = ({ showBox }) => {
  const [showSupportOptions, setShowSupportOptions] = useState(false);


  const handleSupportEmailClick = () => {
    window.location.href = 'mailto:postifygermany@gmail.com?subject=Support%20Anfrage';
  };

  if (!showBox) {
    return null;
  }

  return (
    <Box mt={10} p={2} border={1} borderColor="grey.300" borderRadius="8px" display="flex" flexDirection="column" gap={1}>
      <Button
        variant="contained"
        color="primary"
        href="https://www.instagram.com/sekhzd"
        rel="noopener noreferrer"
        fullWidth
      >
        Instagram
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSupportEmailClick}
        fullWidth
      >
        Kontakt
      </Button>
    </Box>
  );
};

export default Support;
