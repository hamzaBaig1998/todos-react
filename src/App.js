import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Todos from "./components/Todos";
import { useState } from "react";

function App() {
  const [statusFilter, setStatusFilter] = useState("");
  return (
    <>
      <div className="container">
        <h1>Todos</h1>

        <Todos />
      </div>
    </>
  );
}

export default App;
