// src/components/BottomNavBar.js
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';

const BottomNavBar = ({ currentView, onChangeView, onMainClick }) => {
  return (
    <BottomNavigation
      value={currentView}
      onChange={(event, newValue) => {
        if (newValue === 'main') {
          onMainClick();
        } else {
          onChangeView(newValue);
        }
      }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#007bff',
        color: 'white',
        zIndex: 100, // Ensures the bar stays on top
        height: '70px',
        alignItems: 'flex-start', // Align items to the bottom


      }}
    >
      <BottomNavigationAction
        label="Support"
        value="support"
        icon={<HelpIcon />}
        style={{ color: 'white' }}
      />
      <BottomNavigationAction
        label="Startseite"
        value="main"
        icon={<HomeIcon />}
        style={{ color: 'white' }}
      />
      <BottomNavigationAction
        label="Infos"
        value="factsLegal"
        icon={<InfoIcon />}
        style={{ color: 'white' }}
      />
    </BottomNavigation>
  );
};

export default BottomNavBar;
