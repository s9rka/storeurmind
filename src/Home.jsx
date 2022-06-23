import { useRef, useState, useEffect } from 'react';
import "./css/Home.scss"
import Input from './components/Input.jsx';
import FlipCard from './components/FlipCard';
import './css/FlipCard.scss';
import { HashLink as Link } from 'react-router-hash-link';


function Home() {
  const [memories, setMemories] = useState([]);
  const [flipCards, setFlipCards] = useState([]);
  const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"

  useEffect(() => {  
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const memoriesFromDb = [];
      for (const key in responseBody) {
          memoriesFromDb.push(responseBody[key]);
        }
      setMemories(memoriesFromDb);
      const cardOutput = memoriesFromDb.map((element, index) => {return  {id: index +1, variant: "click", front: element.what, front1: element.category, back1: element.how, back2: element.why}})
      setFlipCards(cardOutput);
    })
  },[]);

  function deleteMemory(flipCard) {
    const index = flipCards.findIndex(element => element.id === flipCard.id);
    flipCards.splice(index,1);
    setMemories(flipCards.slice());

    fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(memories),
        "headers": {
            "Content-Type": "application/json"
        }
    })
  }

  return (
    <div className="App">
        <div className='header'>
          <div class='hero-header-box'>
            <h1 class="hero-header">
              <span class="hero-header-main">Store Your Mind</span>
              <span class="hero-header-sub">A tool to observe your thoughts</span>
            </h1>
            <div class="hero-logo">
              <svg width="140" height="140" viewBox="0 0 205 178" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M153.435 88.7793L203.825 118.373L153.435 147.967L102.479 177.561V118.373L153.435 88.7793Z" fill="#874B4B"/>
          <path d="M51.5223 88.7793L0 118.373L51.5223 147.967L102.478 177.561V118.373L51.5223 88.7793Z" fill="#874B4B"/>
          <path d="M0.565918 59.1855V118.373L51.522 147.967V88.7795L0.565918 59.1855Z" fill="black"/>
          <path d="M204.391 59.6934V118.523L153.78 147.938V89.1082L204.391 59.6934Z" fill="#0083C1"/>
          <path d="M205 59.0742V118.262L153.78 147.856V88.6681L205 59.0742Z" fill="black"/>
          <path d="M102.441 59.0744L51.2203 88.6683L0 59.0744L51.2203 29.4805L102.441 59.0744Z" fill="black"/>
          <path d="M153.661 29.48L102.44 59.0739L51.2202 29.48L102.44 0L153.661 29.48Z" fill="black"/>
          <path d="M153.661 118.375L102.44 147.969L51.2202 118.375L102.44 88.7812L153.661 118.375Z" fill="white"/>
          <path d="M153.661 88.7814L102.44 118.375L51.2202 88.7814L102.44 59.1875L153.661 88.7814Z" fill="white"/>
          <path d="M204.881 59.0744L153.661 88.6683L102.44 59.0744L153.661 29.4805L204.881 59.0744Z" fill="black"/>
              </svg>
            </div>
            <div class="hero-button">
              <Link to="/#start" class="button button-black">Start</Link>
            </div>
          </div>
        </div>
        <div id="start">
        </div>
        
        <Input />
        <div id="proov"></div>
      
          
    </div>);
}

export default Home;


/*<div className="container">
            {flipCards.map((card) => (
              <div><button onClick={() => deleteMemory(card)}className='test-button'>button</button> 
              <FlipCard key={card.id} card={card} />

              </div>  
            ))}
          </div> */