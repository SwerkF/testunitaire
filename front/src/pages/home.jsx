import React, { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/global.css";
import EventCard from "../components/EvenCard";
import axios from "axios";

const Home = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => { 
    axios.get("http://localhost:8000/api/eventss")
    .then((response) => {
      // 3 first events
      setEvents(response.data["hydra:member"].slice(0, 3));
      console.log(response.data["hydra:member"].slice(0, 3));
    })
  }, []);

  return (
    <div>
      <div className="img-background">
        <div className="w-50 m-auto">
          <div className="">
            <h1 className="">
              RESERVER UNE PLACE POUR <br />{" "}
              <span className="text-color-yellow">NOS EVENEMENTS </span>!{" "}
            </h1>
          </div>
          <Form className="d-flex ">
            <Form.Group className="w-100 pe-3">
              <Form.Label className="text-light">Date à partir de :</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
            <Form.Group className="w-100  ms-auto">
              <Form.Label className="text-light">Jusqu'au</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="pt-4 container">
        <h3 className="fw-semibold text-center">NOS PROCHAINS EVENEMENTS</h3>
        <div className="row">
          {events.map((event, index) => (
            <div className="col-4 mt-3">
              <EventCard
                key={index}
                title={event.title}
                image={event.image}
                date={event.date}
                description={event.description}
                minimumAge={event.minimumAge}
                buttonText={event.buttonText}
                footerText={event.footerText}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4 ">
        <Link className="nav-link fw-bolder " to="/events"> <Button className="btn-outline-yellow"> Tous les événements...</Button></Link>
      </div>

      <div className=" pt-5 bg-blue mt-5 pb-5">
        <div className="container ">
          <div className="row">
  
            <div className="col-6 pe-5">
              <img
                className="rounded-3"
                width={"100%"}
                src="https://i-de.unimedias.fr/2023/12/07/detle-havre-archi21-lehavrecpatricelebris-otah-6571e6617e6f8.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=max&w=1050"
                alt=""
              />
            </div>
            <div className="col-6 text-white ps-5">
              <h1>Histoire du Havre</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
                quaerat delectus, debitis voluptates dicta similique magni enim
                vitae rem! Id sit quidem, magnam repudiandae nemo ipsum cum
                rerum cupiditate pariatur Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Maiores, ad cupiditate. Corporis
                laboriosam aliquam facilis odio nobis, qui amet distinctio ad
                eligendi nulla deleniti eos iste vel inventore obcaecati.
                Officia? Consequuntur dignissimos fugiat debitis temporibus aut,
                eaque quibusdam quaerat repudiandae veritatis ut, <br /> <br />
                Qeprehenderit quis consequatur ea dolore deleniti nobis
                similique culpa at possimus quidem commodi facilis, minus eius
                ab. Ex. Id, ratione labore, itaque necessitatibus, consequuntur
                similique minima inventore odit corrupti delectus quae quisquam.
                Eligendi, sequi commodi est ea.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
