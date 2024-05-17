import { Routes, Route } from "react-router-dom";
import Reservations from "./pages/Reservations";
import EventList from "./pages/EventList";
import Connexion from "./pages/Connexion";
import NavbarComponent from "./components/NavbarComponent";
//import Reservation from './components/Reservation';
import FooterComponent from "./components/FooterComponent";
import Home from "./pages/home";
import Admin from "./pages/Admin";
import CalendarPage from "./pages/CalendarPage";
import { useContext, createContext, useState, useEffect } from "react";
import "./App.css";

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <header>
          <NavbarComponent />
        </header>
        <div className="content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/login" element={<Connexion />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <FooterComponent />
      </UserContext.Provider>
    </div>
  );
}

export { UserContext };

export default App;
