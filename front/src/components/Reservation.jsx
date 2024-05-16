import React from "react";
import axios from "axios";

const Reservation = ({
  eventName,
  initialDate,
  userBirthDate,
  userId,
  evenAge,
}) => {
  const [numberOfPeople, setNumberOfPeople] = React.useState(1);
  const [ageConfirmation, setAgeConfirmation] = React.useState(false);
  const [isAgeVerified, setIsAgeVerified] = React.useState(false);

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
          throw new Error(
            `Vous devez avoir plus de ${evenAge} ans pour participer à cet événement.`
          );
        }
      } else {
        if (ageConfirmation) {
          setIsAgeVerified(true);
        } else {
          setIsAgeVerified(false);
          throw new Error(
            `Vous devez confirmer que tous les participants ont plus de 18 ans.`
          );
        }
      }
    } catch (error) {
      console.error(error.message);
    }

    try {
      const date = new Date();
      const response = await axios.post('http://localhost/api/reservations', {
        user_id_id: {userId},
        event_date_id: {initialDate},
        number_of_ticket: {numberOfPeople},
        reservatuon_date: {date},
      
      });
      console.log('Form submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
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
    <div>
      <h1>Sign Up for {eventName}</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="number-of-people">Nombre de places:</label>
          <input
            type="number"
            id="number-of-people"
            value={numberOfPeople}
            onChange={handleNumberChange}
            min="1"
            required
          />
        </div>
        {numberOfPeople > 1 && (
          <div>
            <label>
              <input
                type="checkbox"
                id="age-confirmation"
                checked={ageConfirmation}
                onChange={handleAgeConfirmationChange}
              />
              Je confirme que tous les participants ont plus de 18 ans.
            </label>
          </div>
        )}
        <button type="submit" data-testid="submit-button">
          S'inscrire
        </button>
      </form>
      {isAgeVerified && (
        <p>
          Enregistré pour {numberOfPeople} personne(s) à l'événement du{" "}
          {initialDate}.
        </p>
      )}
    </div>
  );
};

export default Reservation;
