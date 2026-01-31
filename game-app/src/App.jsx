import { useState, useCallback, useEffect, useRef } from 'react';
import Board from './components/Board.jsx';
import './App.css';

// Unicode code point ranges for emoji (single-code-point emojis that browsers typically render)
// https://unicode.org/reports/tr51/ - these blocks are predominantly emoji
const EMOJI_RANGES = [
  [0x1f300, 0x1f5ff], // Miscellaneous Symbols and Pictographs
  [0x1f600, 0x1f64f], // Emoticons
  [0x1f680, 0x1f6ff], // Transport and Map Symbols
  [0x1f900, 0x1f9ff], // Supplemental Symbols and Pictographs
  [0x2600, 0x26ff],   // Miscellaneous Symbols (sun, cloud, etc.)
  [0x2700, 0x27bf],   // Dingbats
];

const PAIRS_PER_GAME = 8;

function randomCodePointInRange([start, end]) {
  return start + Math.floor(Math.random() * (end - start + 1));
}

function pickRandomEmojis(count) {
  const symbols = new Set();
  while (symbols.size < count) {
    const [start, end] = EMOJI_RANGES[Math.floor(Math.random() * EMOJI_RANGES.length)];
    const codePoint = randomCodePointInRange([start, end]);
    try {
      const char = String.fromCodePoint(codePoint);
      symbols.add(char);
    } catch {
      // Skip invalid code points (e.g. surrogates)
    }
  }
  return [...symbols];
}

function createShuffledCards() {
  const symbols = pickRandomEmojis(PAIRS_PER_GAME);
  const pairs = [...symbols, ...symbols];
  const cards = pairs.map((symbol, index) => ({
    id: index,
    symbol,
    flipped: false,
    matched: false,
  }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function App() {
  const [cards, setCards] = useState(createShuffledCards);
  const [moves, setMoves] = useState(0);
  const [checking, setChecking] = useState(false);
  const cardRefsMap = useRef(new Map());

  const flippedCards = cards.filter((c) => c.flipped && !c.matched);
  const allMatched = cards.every((c) => c.matched);
  const canClick = !checking && flippedCards.length < 2;

  const setCardRef = useCallback((id, el) => {
    if (el) cardRefsMap.current.set(id, el);
    else cardRefsMap.current.delete(id);
  }, []);

  const handleCardClick = useCallback(
    (clickedCard) => {
      if (!canClick || clickedCard.flipped || clickedCard.matched) return;

      setCards((prev) =>
        prev.map((c) =>
          c.id === clickedCard.id ? { ...c, flipped: true } : c
        )
      );
    },
    [canClick]
  );

  useEffect(() => {
    if (flippedCards.length !== 2) return;

    setMoves((m) => m + 1);
    setChecking(true);
    const [a, b] = flippedCards;
    const match = a.symbol === b.symbol;

    // Keep focus (orange highlight) on the first flipped card
    const firstButton = cardRefsMap.current.get(a.id);
    if (firstButton) firstButton.focus();

    const timer = setTimeout(() => {
      setCards((prev) =>
        prev.map((c) => {
          if (c.id === a.id || c.id === b.id) {
            return { ...c, flipped: match, matched: match };
          }
          return c;
        })
      );
      setChecking(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [flippedCards.length]);

  const handleNewGame = useCallback(() => {
    setCards(createShuffledCards());
    setMoves(0);
    setChecking(false);
  }, []);

  return (
    <div className="app">
      <a href="/" className="back-link">← Back to home</a>
      <h1>Memory</h1>
      <p className="moves">Moves: {moves}</p>

      {allMatched ? (
        <div className="win-message">
          <p>You won in {moves} moves!</p>
          <button type="button" className="new-game-btn" onClick={handleNewGame}>
            Play again
          </button>
        </div>
      ) : (
        <>
          <Board
            cards={cards}
            onCardClick={handleCardClick}
            disabled={!canClick}
            setCardRef={setCardRef}
          />
          <button type="button" className="new-game-btn" onClick={handleNewGame}>
            New game
          </button>
        </>
      )}
    </div>
  );
}

export default App;
