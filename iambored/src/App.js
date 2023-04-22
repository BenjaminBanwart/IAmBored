import './App.css';
import Home from './components/Home';
import TopBar from './components/TopBar';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
