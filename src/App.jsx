import { useState } from "react";
import "./App.css";
import Comparison from "./Components/Comparison";
import Header from "./Components/Header";
import Properties from "./Components/Properties";

function App() {
  const [idA, setIdA] = useState(1701473884);
  const [idB, setIdB] = useState(2769235548);

  return (
    <div className="app-container">
      <Header />
      <Properties idA={idA} setIdA={setIdA} idB={idB} setIdB={setIdB} />
      <Comparison idA={idA} idB={idB} />
    </div>
  );
}

export default App;
