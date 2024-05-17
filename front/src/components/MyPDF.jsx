import React, { useState, useEffect } from 'react';
import { PDFViewer, Document, Page, Text, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

const MyPDF = ({data}) => {
  const [qrCodeImage, setQRCodeImage] = useState('');
  
  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(JSON.stringify(data.reservation)), { width: 128, margin: 1 })
      .then(url => {
        setQRCodeImage(url);
      })
      .catch(err => {
        console.error('Error generating QR code', err);
      });

  }, [data]);

  return qrCodeImage ? (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        // container page
        <Page size="A4" style={{ padding: "30px" }}>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "row", justifyContent: "space-between"}}>
            <div>
              <Text>Nom: {data.event.title}</Text>
              <Text style={{marginTop: "30px"}}>Nombre de place: {data.reservation.number_of_tickets}</Text>
              <Text style={{marginTop: "30px"}}>Date: {data.eventDates.date.split('T')[0]}</Text>
            </div>
            <Image src={qrCodeImage} style={{width: "150px"}} />
          </div>
          <Text style={{marginTop: "30px"}}>Merci de présenter ce QR code à l'entrée de l'événement</Text>
          <Text style={{marginTop: "30px"}}>Bonne journée</Text>
          <Text style={{marginTop: "30px"}}>L'équipe de l'événement</Text>
          <Text style={{marginTop: "30px"}}>© 2021 - Tous droits réservés</Text>
          <Text style={{fontSize: "10px"}}>

          1. Acceptation des Conditions
          En utilisant ce billet, le détenteur ("Vous") accepte de se conformer aux termes et conditions établis par le Havre pour l'événement prévu. Ces conditions incluent, sans limitation, les directives et règles de conduite durant l'événement.

          2. Sécurité
          Pour garantir la sécurité de tous les participants, tous les détenteurs de billets seront soumis à une inspection à l'entrée de l'événement. Le refus de se soumettre à cette inspection peut entraîner un refus d'accès sans remboursement ou compensation.

          3. Objets Interdits
          Les objets suivants sont strictement interdits sur le site de l'événement et seront confisqués sans possibilité de récupération :

          Armes de tout type, y compris, mais sans s'y limiter, les armes à feu, les couteaux, les objets tranchants
          Substances illégales ou drogues de toute nature
          Objets explosifs ou pyrotechniques
          Alcool ou contenants de verre
          Drones ou autres appareils volants télécommandés
          Tout matériel jugé dangereux ou inapproprié par la sécurité de l'événement
          4. Conséquences de la Non-Conformité
          Le non-respect des règles peut entraîner l'expulsion immédiate de l'événement et, dans certains cas, des poursuites judiciaires.

          5. Modification des Conditions
          L'organisateur se réserve le droit de modifier ces conditions à tout moment pour refléter les changements dans les lois ou les nouvelles exigences de sécurité. Il est de votre responsabilité de vérifier ces conditions régulièrement avant l'événement.

          6. Contact
          Pour toute question ou préoccupation concernant ces conditions, veuillez contacter.

          Nous vous remercions de votre coopération et vous souhaitons un événement agréable et sûr !

          </Text>
        </Page>
      </Document>
    </PDFViewer>
  ) : "Loading...";
};

export default MyPDF;
