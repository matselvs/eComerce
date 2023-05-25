import React, { useState } from 'react';
import Games from '../../assets/games';

const GamesList = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);

  const handleCheckboxChange = (e, game) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedGames((prevSelectedGames) => [...prevSelectedGames, { ...game, quantity: 1 }]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + parseFloat(game.price));
      setCount((prevCount) => prevCount + 1);
    } else {
      setSelectedGames((prevSelectedGames) =>
        prevSelectedGames.filter((selectedGame) => selectedGame.id !== game.id)
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - parseFloat(game.price));
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleButtonClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleReturnButtonClick = () => {
    setSelectedGames([]);
    setIsCartVisible(false);
    setIsCheckout(false);
    setTotalPrice(0);
    setCount(0);
  };

  const handleCheckoutButtonClick = () => {
    setIsCheckout(true);
  };

  const handleIncreaseQuantity = (gameId) => {
    setSelectedGames((prevSelectedGames) =>
      prevSelectedGames.map((game) => {
        if (game.id === gameId && game.quantity < getGameById(gameId).maxQuantity) {
          return { ...game, quantity: game.quantity + 1 };
        }
        return game;
      })
    );
    setTotalPrice((prevTotalPrice) =>
      prevTotalPrice + parseFloat(getGameById(gameId).price)
    );
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecreaseQuantity = (gameId) => {
    setSelectedGames((prevSelectedGames) =>
      prevSelectedGames.map((game) => {
        if (game.id === gameId && game.quantity > 1) {
          return { ...game, quantity: game.quantity - 1 };
        }
        return game;
      })
    );
    setTotalPrice((prevTotalPrice) =>
      prevTotalPrice - parseFloat(getGameById(gameId).price)
    );
    setCount((prevCount) => prevCount - 1);
  };

  const getGameById = (gameId) => {
    return Games.find((game) => game.id === gameId);
  };

  const renderGames = () => {
    return Games.map((game) => (
      <div key={game.id} className="card">
        <img className="gameimg" src={game.imgURL} alt={game.name} />
        <h3 className="gamename">{game.name}</h3>
        <p className="preços">Price: {game.price} R$</p>
        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, game)} />
      </div>
    ));
  };

  const renderCart = () => {
    return selectedGames.map((game) => (
      <div key={game.id} className="cart-item item-container">
        <img className="gameimg" src={game.imgURL} alt={game.name} />
        <h3 className="gamename">{game.name}</h3>
        <p className="preços">Price: {game.price} R$</p>
        <div className="quantity-controls">
          <button
            className="decrease-btn"
            onClick={() => handleDecreaseQuantity(game.id)}
            disabled={game.quantity <= 1}
          >
            -
          </button>
          <p className="item-count">{game.quantity}</p>
          <button
            className="increase-btn"
            onClick={() => handleIncreaseQuantity(game.id)}
            disabled={game.quantity >= getGameById(game.id).maxQuantity}
          >
            +
          </button>
        </div>
      </div>
    ));
  };

  const renderCheckout = () => {
    const totalQuantity = selectedGames.reduce((total, game) => total + game.quantity, 0);
  
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-summary">
          <p className="checkout-total-quantity">Quantidade total de itens: {totalQuantity}</p>
          <p className="checkout-total-price">Valor total: {totalPrice.toFixed(2)} R$</p>
        </div>
        <div className="checkout-items">
          {selectedGames.map((game) => (
            <div key={game.id} className="checkout-item">
              <img className="gameimg" src={game.imgURL} alt={game.name} />
              <p className="gamename">{game.name}</p>
              <p className="checkout-game-quantity">Quantidade: {game.quantity}</p>
              
            </div>
            
          ))}
        </div>
        <button className="confirm-purchase-btn">Confirmar Compra</button>
      </div>
    );
  };
  
  return (
    <div>
      {!isCartVisible && !isCheckout ? (
        <>
          <h2 className="gamesalestittle">Produtos:</h2>
          <h2 className="counting">{count}</h2>
          <div className="game-list">{renderGames()}</div>
          <button className="gocarbtn" onClick={handleButtonClick}>
            Ir para o carrinho
          </button>
        </>
      ) : (
        <>
          {isCheckout ? (
            <>
              {renderCheckout()}
             
            </>
          ) : (
            <>
              <h2 className="cart-title">Carrinho de Compras:</h2>
              <h2 className="counting">{count}</h2>
              <div className="cart-list">{renderCart()}</div>
              <p className="total-price">Total: {totalPrice.toFixed(2)} R$</p>
              <button className="checkout-btn" onClick={handleCheckoutButtonClick}>
                Finalizar Compra
              </button>
              <button className="return-btn" onClick={handleReturnButtonClick}>
                Voltar à lista de jogos
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GamesList;
