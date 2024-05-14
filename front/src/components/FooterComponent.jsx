import React from 'react';
import "../styles/global.css";

const FooterComponent = () => {
    return (
      <div className='bg-blue '>
        <div className="container ">
        <footer className="d-flex flex-wrap justify-content-between align-items-center pb-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
         
            <span className="mb-3 mb-md-0 text-light">© 2024 Company, Inc! CARL N'AVAIS PAS D'IDEE.........😥</span>
          </div>
      
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"></li>
            <li className="ms-3"></li>
            <li className="ms-3"></li>
          </ul>
        </footer>
      </div>
      </div>
    );
};

export default FooterComponent;