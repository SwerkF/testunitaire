import React, {useState} from 'react';
import PropTypes from 'prop-types';
import "../styles/ModalComponent.css";
import Reservation from './Reservation';


  const UserContext = React.createContext();

  const Modal = ({ title, onClose, imageUrl, description }) => {
    const [userData, setUserData] = useState(null);

    const handleSignupSuccess = (date, numberOfPeople) => {
      console.log(`Success! Event date: ${date}, Number of people: ${numberOfPeople}`);
    };

    
    const updateUser = (data) => {
      setUserData(data);
    };

    console.log(userData);

    return (
      <UserContext.Provider value={userData}>
        <div className="modal-backdrop">
          <div className="modal-content">
            <button onClick={onClose} className="close-button">&#10005;</button>
            <div className="modal-header">{title}</div>
            <div className="modal-elements">
              <div className="modal-image">
                <img src={imageUrl} alt={title} />
                <p className='description'>{description}</p>
              </div>
              <Reservation
                eventName="Concert"
                initialDate="2024-06-15"
                userBirthDate="2000-05-13"
                evenAge={18}
                onSignupSuccess={handleSignupSuccess}
                updateUser={updateUser}
              />
            </div>
          </div>
        </div>
      </UserContext.Provider>
    );
  };

  Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  export default Modal;
/*
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&#10005;</button>
        <div className="modal-header">{title}</div>
        <div className="modal-elements">
            <div className="modal-image">
                <img src={imageUrl} alt={title}/>
                <p className='description'>{description}</p>
            </div>
            <Reservation eventName="Concert" initialDate="2024-06-15" userBirthDate="2000-05-13" evenAge={18} onSignupSuccess={handleSignupSuccess} />
        </div>    
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Modal;
*/