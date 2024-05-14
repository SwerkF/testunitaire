import PropTypes from "prop-types";

const CardComponent = ({ title, description, buttonText, imageUrl }) => {
  return (
    <div className="card-home">
      <img src={imageUrl} alt="" className="img-card-home" />
      <div className="card-content-home">
        <h2 className="h2-home">{title}</h2>
        <p className="p-home">{description}</p>
        <a href="#" className="button-home a-home">
          {buttonText}
          <span className="material-symbols-outlined">&#10132;</span>
        </a>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CardComponent;