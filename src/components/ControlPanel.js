import React, { useEffect } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ControlPanelContainer = styled(Box)({
  padding: '0px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '0px', // Added line to move the ControlPanel up slightly
});

const ControlPanel = ({
  autoMarkWrong,
  setAutoMarkWrong,
  autoUnmarkCorrect,
  setAutoUnmarkCorrect,
  setShowControlPanel
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControlPanel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAutoMarkWrongChange = (event) => {
    setAutoMarkWrong(event.target.checked);
  };

  const handleAutoUnmarkCorrectChange = (event) => {
    setAutoUnmarkCorrect(event.target.checked);
  };

  return (
    <ControlPanelContainer>
      <Typography variant="body1">Einstellungen</Typography>
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="caption">Falsche Fragen auto markieren</Typography>
        <Switch
          checked={autoMarkWrong}
          onChange={handleAutoMarkWrongChange}
          color="primary"
        />
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="caption">Richtige Antworten auto aufheben</Typography>
        <Switch
          checked={autoUnmarkCorrect}
          onChange={handleAutoUnmarkCorrectChange}
          color="primary"
        />
      </Box>
    </ControlPanelContainer>
  );
};

export default ControlPanel;
