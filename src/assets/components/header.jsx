import React from 'react';
import arnialogo from '../img/arnialogo.png';


const Header = () => {
  return (
    <header>
      
      {<img src={arnialogo} alt="Minha Imagem" />}
      <h1 class="headertittle">Loja Virtual</h1>
      
    </header>
  );
}

export default Header;