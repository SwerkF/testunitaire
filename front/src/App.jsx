import { Routes, Route } from 'react-router-dom';
import Reservations from './pages/Reservations';
import CardComponent from './components/CardComponent';
import EventList from './pages/EventList';
import Connexion from './pages/Connexion';
import NavbarComponent from './components/NavbarComponent';
import Reservation from './components/Reservation';
import FooterComponent from './components/FooterComponent';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home> </Home>} />
            <Route path="/reservations" element={<Reservations></Reservations>} />
            <Route path="/events/:id" element={<EventList></EventList>} />
            <Route path='/login' element={<Connexion/>}></Route>
          </Routes>
        {/* <CardComponent /> */}
        <FooterComponent />
      </header>
    </div>
  );
}

export default App;
