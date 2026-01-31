import Card from './Card.jsx';

function Board({ cards, onCardClick, disabled, setCardRef }) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          disabled={disabled}
          setCardRef={setCardRef}
        />
      ))}
    </div>
  );
}

export default Board;
