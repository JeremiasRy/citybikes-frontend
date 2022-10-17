import './cssfiles/App.css';
import { Home } from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from './components/navigation/Navbar';

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className='Components'> 
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
