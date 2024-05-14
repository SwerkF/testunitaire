import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reservations from './pages/Reservations';
import CardComponent from './components/CardComponent';
import EventList from './pages/EventList';
import Connexion from './pages/Connexion';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/reservations" element={<Reservations></Reservations>} />
            <Route path="/events/:id" element={<EventList></EventList>} />
            <Route path='/login' element={<Connexion/>}></Route>
          </Routes>
        </BrowserRouter>
        <CardComponent />
      </header>
    </div>
  );
}

export default App;
