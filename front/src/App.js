import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reservations from './pages/Reservations';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/reservations" element={<Reservations></Reservations>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
