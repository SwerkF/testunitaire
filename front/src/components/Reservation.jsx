import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../styles/global.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservation = ({
  eventName,
  initialDate,
  userBirthDate,
  userId,
  evenAge,
  event_date_id,
}) => {
  const [numberOfPeople, setNumberOfPeople] = React.useState(1);
  const [ageConfirmation, setAgeConfirmation] = React.useState(false);
  const [isAgeVerified, setIsAgeVerified] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [succesSend, setSuccesSend] = React.useState(false);

  const handleNumberChange = (event) => {
    setNumberOfPeople(parseInt(event.target.value));
  };

  const handleAgeConfirmationChange = (event) => {
    setAgeConfirmation(event.target.checked);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (numberOfPeople === 1) {
        if (calculateAge(userBirthDate, evenAge)) {
          console.log(`Vous avez plus de ${evenAge} ans.`);
          setIsAgeVerified(true);
        } else {
          setIsAgeVerified(false);
          setError(
            `Vous devez avoir plus de ${evenAge} ans pour participer à cet événement.`
          );
        }
      } else {
        if (ageConfirmation) {
          setIsAgeVerified(true);
        } else {
          setIsAgeVerified(false);
          setError(
            `Vous devez confirmer que tous les participants ont plus de 18 ans.`
          );
        }
      }
    } catch (error) {
      console.error(error.message);
    }
    if (!userId) {
      setError("Vous devez être connecté pour réserver un événement.");
      return;
    }

    try {
      const date = new Date();
      const response = await axios.post(
        "http://localhost:8000/api/reservations",
        {
          user: "/api/users/" + userId,
          eventDate: "/api/events_datess/" + event_date_id,
          numberOfTickets: numberOfPeople,
          reservationDate: date,
        }
      );
      toast.success("Votre réservation a été enregistrée.");
      setError("");
      setSuccesSend(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  function calculateAge(birthDate, minAge) {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age >= minAge;
  }

  return (
    <div className="container">
      <h1 className="text-left mb-4">{eventName}</h1>
      <form
        onSubmit={handleFormSubmit}
        className="border p-4 shadow-sm rounded"
      >
        <div className="form-group mb-3">
          <label htmlFor="number-of-people">Nombre de places:</label>
          <input
            type="number"
            id="number-of-people"
            className="form-control"
            value={numberOfPeople}
            onChange={handleNumberChange}
            min="1"
            required
          />
        </div>
        {numberOfPeople > 1 && (
          <div className="form-group mb-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                id="age-confirmation"
                className="form-check-input"
                checked={ageConfirmation}
                onChange={handleAgeConfirmationChange}
              />{" "}
              Je confirme que tous les participants ont plus de 18 ans.
            </label>
          </div>
        )}
        <div>
        <Button
  type="submit"
  disabled={succesSend ? true : false}
  className="btn-color btn-block"
>
  Réserver maintenant <i className="bi bi-cash-stack"></i>
</Button>


        </div>
        {error && <div className="text-danger mt-4">{error}</div>}
      </form>
      {isAgeVerified && <ToastContainer />}
      <ToastContainer />
    </div>
  );
};

export default Reservation;
