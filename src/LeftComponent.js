// LeftComponent.js
import React from 'react';
import './LeftComponent.css'; // Import CSS file for styling

const LeftComponent = () => {
  return (
    <div className="left-component">
      <div className="account-menu">
        <h3>Account Menu</h3>
        <ul>
          <li>Wrong Answered</li>
          <li>Statistics</li>
          <li>Mock Exams</li>
          <li>Bookmarks</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Delete Account</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default LeftComponent;
