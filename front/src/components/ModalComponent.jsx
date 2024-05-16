import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import "../styles/ModalComponent.css";
import Reservation from './Reservation';
//import axios from 'axios';



  const Modal = ({ title, onClose, imageUrl, description, date, eventAge}) => {

    const [userId, setUserId] = useState(null);
    const [userBirthday, setUserBirthday] = useState(null);
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    

    console.log(eventAge);
      
    useEffect(() => {
      setUserBirthday(user.birthday);
      setUserId(user.id);
      console.log(user.birthday, user.id);
    }, []);



    return (
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
                eventName={title}
                userId={userId}
                initialDate={date}
                userBirthDate={userBirthday}
                evenAge={eventAge}
              />
          </div>
        </div>
      </div>
    );
  };

  Modal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    eventAge: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    userBirthday: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
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