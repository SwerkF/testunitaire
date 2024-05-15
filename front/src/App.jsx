import { Routes, Route } from 'react-router-dom';
import Reservations from './pages/Reservations';
import EventList from './pages/EventList';
import Connexion from './pages/Connexion';
import NavbarComponent from './components/NavbarComponent';
import Reservation from './components/Reservation';
import FooterComponent from './components/FooterComponent';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './App.css';
import CalendarPage from './pages/CalendarPage';
import { useContext, createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <UserContext.Provider value={{ user, setUser }}>
          <NavbarComponent />
            <Routes>
              <Route path="/" element={<Home> </Home>} />
              <Route path="/reservations" element={<Reservations></Reservations>} />
              <Route path ="/calendar" element={<CalendarPage></CalendarPage>} />
              <Route path="/events" element={<EventList></EventList>} />
              <Route path='/login' element={<Connexion/>}></Route>
              <Route path='/admin' element={<Admin/>}></Route>
            </Routes>
          {/* <CardComponent /> */}
          <FooterComponent />
        </UserContext.Provider>
      </header>
    </div>
  );
}

export { UserContext };

export default App;
