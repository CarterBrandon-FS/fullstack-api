import { useState } from "react";
import CompanyList from "./components/CompanyList";
import WorkerList from "./components/WorkerList";

import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <header>
          <h1>TwoOfTheSame Portal</h1>
          <p>A full-stack view of cour companies and their workers</p>
        </header>

        <div className="columns">
          <div className="column"></div>
          <CompanyList />
        </div>
        <div className="column">
          <WorkerList />
        </div>
      </div>
    </>
  );
}

export default App;
