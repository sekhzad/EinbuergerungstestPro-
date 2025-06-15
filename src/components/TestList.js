// src/components/TestList.js
import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#1e88e5', // Default primary color, you can customize this color
      },
    },
  });
  

const TestList = ({ tests, onSelectTest, onBack }) => {
  return (
    <Box>
     <ThemeProvider theme={theme}>
      <Box mt={1} sx={{ 
        display: 'inline-block', 
        backgroundColor: '#1e88e5', 
        padding: 1, 
        boxShadow: '5px 5px 15px rgba(30,0,0.3)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <Typography variant="body2" marginBottom={0}>
          Möchten Sie Ihr Wissen testen? Bitte wählen Sie einen Test aus:
        </Typography>
      </Box>
    </ThemeProvider>

      <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center">
        {tests.map((test, index) => (
          <Paper
            key={index}
            elevation={20}
            style={{
              margin: '10px',
              padding: '20px',
              minWidth: '190px',
              cursor: 'pointer',
              boxShadow: '5px 5px 15px rgba(30,0,0.3)',
              backgroundColor: index % 3 === 0 ? 'black' : index % 3 === 1 ? 'red' : 'gold',
              color: index % 3 === 0 ? 'white' : 'black',
            }}
            onClick={() => onSelectTest(test)}
          >
            <Typography variant="h5" align='center'>Test {index + 1}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default TestList;
