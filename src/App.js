
import './App.css';
import {useEffect, useState} from 'react';
import Axios from 'axios';



function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [sortType, setSortType] = useState('coins');
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
          setListOfCoins(response.data.coins);
          console.log(response.data.coins);
    });
  }, []);
  useEffect(() => {
    const sortArray = type => {
      const types = {
        rankUp: 'rank',
        rankDown: 'rank',
        priceChange1dUp: 'priceChange1d',
        priceChange1dDown: 'priceChange1d',
      };
      const sortProperty = types[type];
      if(type === 'rankDown'){
      const sorted = [...listOfCoins].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setListOfCoins(sorted);
    } else if(type === 'rankUp') {
      const sorted = [...listOfCoins].sort((a, b) => a[sortProperty] - b[sortProperty]);
      setListOfCoins(sorted);
    } else if(type === 'priceChange1dUp') {
      const sorted = [...listOfCoins].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setListOfCoins(sorted);
    } else if(type === 'priceChange1dDown') {
      const sorted = [...listOfCoins].sort((a, b) => a[sortProperty] - b[sortProperty]);
      setListOfCoins(sorted);
    }
    };
    sortArray(sortType);
  }, [sortType]);

  return (
    <div className="App"> 
      <div className="cryptoHeader">
      <p class="logo-name">Crypto100</p>
      <button value="rankDown" onClick={(e) => setSortType(e.target.value)}>Rank Descending</button>
      <button value="rankUp" onClick={(e) => setSortType(e.target.value)}>Rank Ascending</button>
      <button value="priceChange1dUp" onClick={(e) => setSortType(e.target.value)}>24h UP</button>
      <button value="priceChange1dDown" onClick={(e) => setSortType(e.target.value)}>24h Down</button>
      </div>
      <div className="cryptoDisplay">
        {listOfCoins.map((coin) => {
          return <div class="cryptoBlok">
            <div class="logoNaziv">
             <img class="logoCrypto" src={`${coin.icon}`} width="48em" height="48em"/>
             <p class="skracenica">{coin.name} ({coin.symbol})</p>
             <p class="rank">{coin.rank}</p>
             </div>
             <div class="cenaPromena">
              <p>Price:</p>
              <p class="cenaPozitivna">{coin.price.toFixed(5)}</p>
              <p>24h Change:</p>
              <p class={`${coin.priceChange1d}` < 0 ? `cenaNegativna` : `cenaPozitivna`}>{coin.priceChange1d}%</p>
              </div>
             </div>;
        })}
      </div>
    </div>
    
  );
}

export default App;
