import React from 'react';
import visa from '../img/visa.png';
import mastercard from '../img/mastercard.png';
import hipercard from '../img/hipercard.png';
import boleto from '../img/boleto.png';

const Footer = () => {
  const images = [
    { src: visa, alt: 'Visa' },
    { src: mastercard, alt: 'Mastercard' },
    { src: boleto, alt: 'Boleto' },
    { src: hipercard, alt: 'Hipercard' },
   
  ];

  return (
    <footer className="custom-footer">
      <p className="small-text">Metodo de pagamento:</p>
      <div className="image-container">
      {images.map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} />
      ))}
      </div>
    </footer>
  );
}

export default Footer;