import React from "react";
import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React CI/CD App</h1>
        <p>This is a real React app scaffold ready for GitHub Actions CI/CD.</p>
      </header>
    </div>
  );
}

export default App;
