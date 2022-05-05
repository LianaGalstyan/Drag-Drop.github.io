import { useState } from 'react';
import './App.css';

const App = () => {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: 'CARD 3' },
    { id: 2, order: 1, text: 'CARD 1' },
    { id: 3, order: 2, text: 'CARD 2' },
    { id: 4, order: 4, text: 'CARD 4' },
  ])

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, card) {
    e.target.style.background = 'yellow';
    e.target.style.border = '0';
    console.log('drag', card);
    setCurrentCard(card)
  }
  function dragLeaveHandler(e) {
    e.target.style.border = 'none';
  }
  function dragEndHandler(e) {
    e.target.style.background = 'white';
    e.target.style.border = '4px solid';
    console.log('end')
  }
  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgray'
    console.log('overererere')
  }

  function dropHandler(e, card) {
    e.preventDefault();
    setCardList(cardList.map(c => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order }
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order }
      }
      return c
    }))
    e.target.style.background = 'white';
  }


  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }


  return (
    <div className='app'>
      {cardList.sort(sortCards).map(card =>
        <div
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable={true}
          className={'card'}>
          {card.text}
        </div>
      )}
    </div>
  )
}

export default App;
