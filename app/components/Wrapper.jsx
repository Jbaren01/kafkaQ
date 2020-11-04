import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
// import CoreButton from './CoreButton.jsx';

/* eslint-disable */
class Wrapper extends Component {
  render() {
    return (
      // <CoreButton />
      <div className="app">
        <div className="title">
          <h2>kafkaQ</h2>
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-container">
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default Wrapper;
