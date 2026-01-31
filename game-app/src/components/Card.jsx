import { useRef, useEffect } from 'react';

function Card({ card, onClick, disabled, setCardRef }) {
  const showFront = card.flipped || card.matched;
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!showFront && buttonRef.current === document.activeElement) {
      buttonRef.current.blur();
    }
  }, [showFront]);

  return (
    <button
      ref={(el) => {
        buttonRef.current = el;
        setCardRef?.(card.id, el);
      }}
      type="button"
      className={`card-cell ${showFront ? 'flipped' : ''} ${card.matched ? 'matched' : ''} ${disabled ? 'is-disabled' : ''}`}
      onClick={() => !disabled && onClick(card)}
      aria-disabled={disabled}
      aria-label={showFront ? `Card: ${card.symbol}` : 'Face-down card'}
    >
      <span className="card-inner">
        <span className={`card-flip ${showFront ? 'flipped' : ''}`}>
          <span className="card-back">?</span>
          <span className="card-front">{card.symbol}</span>
        </span>
      </span>
    </button>
  );
}

export default Card;
