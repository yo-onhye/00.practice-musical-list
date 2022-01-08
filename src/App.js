import List from "./pages/list/List";
import './asset/styles/common.scss'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="doc_header">
        <h1 className="tit_header">Musical List</h1>
      </header>
      <main className="doc_main">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/list" />} /> 
            <Route path="/list" element={<List />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
