import React from 'react';

const Reservation = ({eventName, initialDate, userBirthDate,evenAge, onSignupSuccess }) => {
    const [eventDate, setEventDate] = React.useState(initialDate);
    const [numberOfPeople, setNumberOfPeople] = React.useState(1);
    const [ageConfirmation, setAgeConfirmation] = React.useState(false);
    const [isAgeVerified, setIsAgeVerified] = React.useState(false);

    const handleDateChange = (event) => {
        setEventDate(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNumberOfPeople(parseInt(event.target.value));
    };

    const handleAgeConfirmationChange = (event) => {
        setAgeConfirmation(event.target.checked);
    };

    const handleFormSubmit = (e) => {
    e.preventDefault();


    if (numberOfPeople === 1) {
      if (calculateAge(userBirthDate, evenAge)) {
        console.log("Vous avez plus de "+evenAge+" ans.");
        setIsAgeVerified(true);
        onSignupSuccess(eventDate, numberOfPeople);
      } else {
        console.log("Vous devez avoir plus de 18 ans pour participer à cet événement.");
        setIsAgeVerified(false);
      }
    } else {
      if (ageConfirmation) {
        setIsAgeVerified(true);
        onSignupSuccess(eventDate, numberOfPeople);
      } else {
        console.log("Vous devez confirmer que tous les participants ont plus de 18 ans.");
        setIsAgeVerified(false);
      }
    }
  };

  function calculateAge(birthDate, minAge) {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age >= minAge;
}

    return (
        <div>
      <h1>Sign Up for {eventName}</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="event-date">Date de l'evement:</label>
          <input type="date" id="event-date" value={eventDate} onChange={handleDateChange} required />
        </div>
        <div>
          <label htmlFor="number-of-people">Nombre de place:</label>
          <input type="number" id="number-of-people" value={numberOfPeople} onChange={handleNumberChange} min="1" required />
        </div>
        {numberOfPeople > 1 && (
          <div>
            <label>
              <input type="checkbox" checked={ageConfirmation} onChange={handleAgeConfirmationChange} />
              Je confirme que tous les participants ont plus de 18 ans.
            </label>
          </div>
        )}
        <button type="submit">S'inscrire</button>
      </form>
      {isAgeVerified && <p>Enregistre pour {numberOfPeople} personnes à l'événement du {eventDate}. </p>}
    </div>
    );
};

export default Reservation;