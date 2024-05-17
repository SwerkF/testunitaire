import React from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/global.css";
import EventCard from "../components/EvenCard";

const Home = () => {
  const events = [
    {
      title: "Armada 2024",
      image:
        "https://france3-regions.francetvinfo.fr/image/UU3js63ZnuylOsaeJO3GgtqIs1w/1200x900/regions/2023/06/14/6489820804105_off-armada-bateaux.jpg",
      date: "24/08/2024 - 18h00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, reprehenderit aperiam impedit illo commodi?",
      buttonText: "Réserver",
      footerText: "En savoir plus ...",
    },
    {
      title: "Festival de Musique",
      image:
        "https://leclaireur.fnac.com/wp-content/uploads/2023/05/photo-solidays-bricedelamarche-1256x826.jpg",
      date: "15/09/2024 - 20h00",
      description: "Un festival de musique avec des artistes du monde entier.",
      buttonText: "Réserver",
      footerText: "En savoir plus ...",
    },
    {
      title: "Festival de Cinéma",
      image:
        "https://cdn.sortiraparis.com/images/80/77153/422736-festival-de-films-courts-de-maisons-laffitte-2019.jpg",
      date: "30/09/2024 - 20h00",
      description: "Un festival de cinéma avec des films du monde entier.",
      buttonText: "Réserver",
      footerText: "En savoir plus ...",
    },
  ];

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
              <Form.Label>Date à partir de :</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
            <Form.Group className="w-100  ms-auto">
              <Form.Label>Jusqu'au</Form.Label>
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
