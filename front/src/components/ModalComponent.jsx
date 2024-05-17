import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import "../styles/ModalComponent.css";
import Reservation from './Reservation';
//import axios from 'axios';



  const Modal = ({ title, onClose, imageUrl, description, date, eventAge, ticketRestant, event_date_id}) => {

    const [userId, setUserId] = useState(null);
    const [userBirthday, setUserBirthday] = useState(null);
    
    const user = JSON.parse(localStorage.getItem('user'));
    

    console.log(eventAge);
      
    useEffect(() => {
      setUserBirthday(user && user.birthday);
      setUserId(user && user.id);
    }, []);



    return (
      <div className="modal-backdrop modal-dialog-scrollable">
        <div className="modal-content">
          <button onClick={onClose} className="close-button">&#10005;</button>
          <div className="modal-header">Réservez vos billets</div>
          <div className="modal-elements">
            <div className="">
              {imageUrl ? <img src={imageUrl} alt={title} width={"500px"}/> : <img src="https://placehold.co/100x100" width={"500px"} alt={title} />}
              <p className='description'>{description}</p>
            </div>
            <Reservation
                  eventName={title}
                  userId={userId}
                  initialDate={date}
                  userBirthDate={userBirthday}
                  evenAge={eventAge}
                  event_date_id={event_date_id}
                  ticketRestant={ticketRestant}
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