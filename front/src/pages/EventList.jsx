/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
*/
import CardComponent from "../components/CardComponent";
import "../styles/EventList.css";

const EventList = () => {
  /*const [events, setEvents] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:3000/events`)
        .then((response) => {
            setEvents(response.data);
        });
    }, [id]);
    */
    return (
        <div>
        <h1 class="title-h1">Event List</h1>
        <ul class= "event-container">
            <CardComponent title="title" description="description brève de l'évènement" buttonText="plus d'info" imageUrl="https://img.freepik.com/photos-gratuite/lumiere-scene-rougeoyante-illumine-fans-rock-liesse-generes-par-ia_188544-37983.jpg" id="1"/>
            <CardComponent title="title" description="description brève de l'évènement" buttonText="plus d'info" imageUrl="https://img.freepik.com/photos-gratuite/lumiere-scene-rougeoyante-illumine-fans-rock-liesse-generes-par-ia_188544-37983.jpg" id="3"/>
            <CardComponent title="title" description="description brève de l'évènement" buttonText="plus d'info" imageUrl="https://img.freepik.com/photos-gratuite/lumiere-scene-rougeoyante-illumine-fans-rock-liesse-generes-par-ia_188544-37983.jpg" id="4"/>
            <CardComponent title="title" description="description brève de l'évènement" buttonText="plus d'info" imageUrl="https://img.freepik.com/photos-gratuite/lumiere-scene-rougeoyante-illumine-fans-rock-liesse-generes-par-ia_188544-37983.jpg" id="5"/>
            <CardComponent title="title" description="description brève de l'évènement" buttonText="plus d'info" imageUrl="https://img.freepik.com/photos-gratuite/lumiere-scene-rougeoyante-illumine-fans-rock-liesse-generes-par-ia_188544-37983.jpg" id="6" />
            <CardComponent title="title" description="description brève de l'évènement" buttonText="plus d'info" imageUrl="https://img.freepik.com/photos-gratuite/lumiere-scene-rougeoyante-illumine-fans-rock-liesse-generes-par-ia_188544-37983.jpg" id="7"/>
        </ul>
        </div>
    );
}

export default EventList;