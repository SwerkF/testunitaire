import React from 'react';
import "../styles/global.css";

const FooterComponent = () => {
  return (
    <div className="bg-blue">
      <div className="container-fluid">
        <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-2 border-top">
          <div className="col-md-3 d-flex align-items-center">
            <span className="text-light">© 2024 Company, Inc. Tous droits réservés.</span>
          </div>

          <div className="col-md-3">
            <h6 className="text-white">Suivez nous:</h6>
            <ul className="list-unstyled d-flex">
              <li><a href="#!" className="nav-link px-2 text-primary"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#!" className="nav-link px-2 text-primary"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#!" className="nav-link px-2 text-danger"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="text-white">S'abonner à notre lettre d'information</h6>
            <form className="d-flex flex-wrap">
              <input type="email" className="form-control me-2" placeholder="Email address" aria-label="Email address"/>
              <button type="submit" className="btn btn-outline-warning btn-sm">S'abonner</button>
            </form>
          </div>

          <div className="col-md-3 text-white">
            <p style={{fontSize : "14px"}}>Découvrez nos solutions innovantes et nos technologies avancées qui stimulent le process de billettérie.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FooterComponent;
