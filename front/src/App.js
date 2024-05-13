import './App.css';
import Connexion from './components/Connexion';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Connexion/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
