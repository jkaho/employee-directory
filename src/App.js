import React from "react";
import Navbar from "./components/Navbar";
import FilterSort from "./components/FilterSort";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FilterSort />
      <Table />
    </div>
  );
}

export default App;
