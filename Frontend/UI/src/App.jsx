import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="app">
  
      <Dashboard isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </div>
  );
}

export default App;


