import FooterComponent from "./components/FooterComponent";
import NavbarComponent from "./components/NavbarComponent";
import Reservation from "./components/Reservation";

function App() {
  return (
    <div className="App">
      <NavbarComponent/>

      <Reservation
  eventName="Summer Festival"
  initialDate="2023-06-15"
  userBirthDate="2000-05-22"
  evenAge="18"
  onSignupSuccess={(date, numPeople) => {

  }}
  />



      <FooterComponent/>
    </div>
  );
}

export default App;
