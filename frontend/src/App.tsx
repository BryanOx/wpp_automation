import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      {
        !loggedIn ? (
          <h1>Lee el código QR para iniciar sesión</h1>
        ) : (
          <h1>Sesión iniciada</h1>
        )
      }
    </div>
  );
}

export default App;
