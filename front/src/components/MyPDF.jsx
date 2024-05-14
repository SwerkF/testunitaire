import React, { useState, useEffect } from 'react';
import { PDFViewer, Document, Page, Text, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

const MyPDF = (props) => {
  const [qrCodeImage, setQRCodeImage] = useState('');

  useEffect(() => {
    QRCode.toDataURL(props.uuid, { width: 128, margin: 1 })
      .then(url => {
        setQRCodeImage(url);
      })
      .catch(err => {
        console.error('Error generating QR code', err);
      });
  }, [props.uuid]);

  return qrCodeImage ? (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page>
          <Text>Hello, this is my PDF!</Text>
          <Image src={qrCodeImage} style={{ width: 128, height: 128 }} />
        </Page>
      </Document>
    </PDFViewer>
  ) : null;
};

export default MyPDF;
