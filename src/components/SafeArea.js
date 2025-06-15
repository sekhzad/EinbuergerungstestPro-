// SafeArea.js
// SafeArea is the top screen area 
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
  },
});

const handleDonation = (amount) => {
  window.location.href = `https://www.paypal.me/sekhzad?locale.x=en_DE${amount}`;
};

const SafeArea = ({ onBack, showBackButton, title }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          backgroundColor: 'primary.main',
          padding: '3px',
          position: 'fixed', // Fixed position
          top: 0, // Stick to the top
          left: 0, // Align to the left
          right: 0, // Align to the right
          display: 'flex',
          alignItems: 'flex-end', // Align items to the bottom
          justifyContent: 'space-between',
          boxShadow: '0px 12px 4px rgba(0, 0, 0, 0.1)',
          borderBottom: '3px solid rgba(0, 0, 0, 0.1)',
          zIndex: 1000, // Ensure it stays above other content
          height: '80px' // Adjust the height to ensure alignment at the bottom
        }}
      >
        {showBackButton && (
          <Button 
            
            variant="contained"
            color="primary"
            onClick={onBack}
            style={{
              padding: '4px 12px', // Adjust padding to make it smaller
              fontSize: '0.75rem', // Adjust font size to make it smaller
              alignSelf: 'flex-end' // Align to the bottom
            }}
          >
            <ArrowBackIosIcon style={{ marginRight: -1 }} /> 
          </Button>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end', // Align content to the bottom
            alignItems: 'center',
            flexGrow: 1,
            height: '100%', // Ensure the box takes the full height of its container
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" color="white" style={{ alignSelf: 'center' }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ width: '24px', alignSelf: 'flex-end' }} /> {/* Spacer to balance the flex layout */}
      </Box>



    </ThemeProvider>
  );
};

export default SafeArea;
