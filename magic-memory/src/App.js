import { useState, useEffect } from "react";

import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  {
    src: "/img/helmet-1.png",
    matched: false,
  },
  {
    src: "/img/potion-1.png",
    matched: false,
  },
  {
    src: "/img/ring-1.png",
    matched: false,
  },
  {
    src: "/img/scroll-1.png",
    matched: false,
  },
  {
    src: "/img/shield-1.png",
    matched: false,
  },
  {
    src: "/img/sword-1.png",
    matched: false,
  },
];

function App() {
  //Tạo mảng rỗng để hứng shuffle card
  const [cards, setCards] = useState([]);
  //Tạo để đếm màn chơi
  const [turn, setTurn] = useState(0);
  // Tạo state cho 2 lựa chọn
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // Tạo state để disable lượt click liên tục
  const [disabled, setDisabled] = useState(false);

  // Random card shuffle card
  let shuffleCard = () => {
    //Trong lòng card shuffle t muốn đặt là cặp nên sử dụng spread để tạo 2 phần tử trong mảng
    let shuffleCard = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCard);
    setTurn(0);
  };

  //Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //So sánh 2 choice card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        //console.log("Bằng nhau");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choices và tạo turn

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  // Nếu toàn bộ matched true , reset lại game

  useEffect(() => {
    shuffleCard();
  }, []);

  console.log(cards, turn);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card-grid">
        {cards.map((renderCard) => {
          return (
            <SingleCard
              key={renderCard.id}
              propCard={renderCard}
              handleChoice={handleChoice}
              flipped={
                renderCard === choiceOne ||
                renderCard === choiceTwo ||
                renderCard.matched
              }
              disabled={disabled}
            />
          );
        })}
      </div>
      <p>Turn: {turn}</p>
    </div>
  );
}

export default App;
