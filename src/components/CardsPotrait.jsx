import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Card data with image paths
const initialCards = [
  {
    id: 1,
    title: "Hi Dimple :]",
    message: "If anyone ever ask me to describe you, I will always describe you as a tangerine 🍊. Let me tell you why~",
    image: ""
  },
  {
    id: 2,
    title: "The Peel",
    message: "The outer layer—bright, warm, trying. The version that shows up even on the days when everything feels heavy. The one that gives and matches the energy of the room even when there's barely anything left to pull from. It's real. All of it. The warmth isn't performance—it's generous. it's just expensive. It costs something every single time, and still it gets offered. Freely. Quietly. Without asking for anything back. But this layer, as bright as it is, as generous as it is—it's not the whole fruit. It never was. There's more underneath.",
    image: "/images/tangerine-peel.jpg"
  },
  {
    id: 3,
    title: "Peeling Back",
    message: "You don't open easily. And why would you? Some people peel a tangerine and the skin falls away without effort, clean and simple. Some hold on. The skin clings to the flesh beneath, resists the pull, asks for a little more time, a little more care. It takes patience. That's not a flaw. It's just how some things are built—carefully, protectively, for good reason. Openness is not owed to anyone. Trust is not a door that should swing loose in the wind. Some things are worth the slow unfolding. Some things only reveal themselves to patience.",
    image: "/images/peeling-tangerine.jpg"
  },
  {
    id: 4,
    title: "The White Threads",
    message: "Peel a tangerine and this is what waits first. The white threads—bitter, fibrous, clinging to every segment. Most people strip them away impatiently, tossing them aside to get to the sweetness underneath. But the threads hold the fruit together. They protect what's soft inside. They were never the problem. Some people just don't want to hold things that ask for patience. The quietness that gets mistaken for coldness. The walls that take time to climb. The way openness doesn't come easy. Some people stop there and call it too much effort. That says nothing about the fruit. Only about what their hands were willing to hold.",
    image: "/images/white-threads-tangerine.webp"
  },
  {
    id: 5,
    title: "The Scent",
    message: "A tangerine leaves something behind. Peel it once and the scent stays—on your hands, in the room, longer than expected. It doesn't ask to be remembered. It just lingers. That's what presence does when it's real. The energy given freely, the words offered to strangers, the way showing up happens even when it's hard—it stays with people. It lives somewhere in them even after the moment passes. When everything feels heavy, when the doubt is loud, remember: people look for tangerines. They come back for them. Not because the fruit is perfect. Because something about it lingers. A good scent doesn't disappear just because the fruit doubts itself.",
    image: "/images/tangerine-scent.webp"
  },
  {
    id: 6,
    title: "The Fruit",
    message: "The fruit inside is never just one thing. Some segments are sweet—soft, easy, the part people hope for when they reach in. But some segments are sour. Sharp. Unexpected. The kind that makes faces scrunch, that catches people off guard, that not everyone wants to hold in their mouth. And somehow both exist in the same fruit. No apology. No contradiction. A tangerine was never meant to be only sweet. The sourness doesn't cancel out the sweetness. The sweetness doesn't have to justify the sourness. They just live together, side by side, segment by segment. Both real. Both the fruit. Both still worth tasting.",
    image: "/images/tangerine-fruit.jpg"
  },
  {
    id: 7,
    title: "The Seeds",
    message: "At the center, sometimes, there are seeds. Small, hard, bitter if you bite through. Not everyone reaches this deep. And not everyone should. Some things exist at the core that don't belong to anyone else—things that stay protected, stay hidden, stay yours. No one has the right to demand access here. No one gets to pry open what you've chosen to keep closed. The people who bite down and react badly were never safe to begin with. The seeds are not a flaw. They are just the part of you that you are still allowed to keep.",
    image: "/images/tangerine-seed-2.jpg"
  },
  {
    id: 8,
    title: "The Whole",
    message: "A tangerine is not just the sweetness. It's the skin that holds everything in. The threads that people strip away. The scent that lingers without trying. The sourness that surprises. The seeds that stay hidden at the center. All of it, together, makes the fruit. Take one part away and it's not a tangerine anymore—it's just pieces. You are not meant to be pieces. You are not meant to be only the easy parts, the bright parts, the parts that make people comfortable. You are the whole thing. And whole things are not less valuable because they are complex. In some cultures, the tangerine is sacred. Essential. Placed on altars and given as gifts. Not despite what it is—because of it. The same is true for you. Whole things are not loved in pieces. They are loved whole.",
    image: "/images/whole-tangerine.jpg"
  }
];

// Dynamic font size based on message length
const getMessageStyle = (messageLength) => {
  if (messageLength < 150) {
    return { fontSize: 'clamp(15px, 3.8vw, 18px)', lineHeight: 1.8 };
  } else if (messageLength < 300) {
    return { fontSize: 'clamp(13px, 3.2vw, 15px)', lineHeight: 1.75 };
  } else if (messageLength < 500) {
    return { fontSize: 'clamp(12px, 3vw, 14px)', lineHeight: 1.7 };
  } else {
    return { fontSize: 'clamp(11px, 2.8vw, 13px)', lineHeight: 1.65 };
  }
};

// Tilts for stacked cards - more tilted
const stackTilts = [0, -6, 5, -4, 7, -5, 6];

// Single Card Component
const Card = ({ 
  card, 
  index,
  totalVisible,
  onSwipe,
  isFlipped,
  onFlip,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const isTop = index === 0;
  
  // Rotation based on drag
  const dragRotate = useTransform(x, [-300, 300], [-25, 25]);
  
  // Stack properties
  const stackY = index * 12;
  const stackScale = 1 - index * 0.04;
  const stackTilt = stackTilts[index % stackTilts.length];

  const handleDragEnd = (_, info) => {
    if (!isFlipped || !isTop) return;

    const threshold = 80;
    const velocity = Math.abs(info.velocity.x);
    const offset = Math.abs(info.offset.x);

    if (offset > threshold || velocity > 400) {
      // Swipe away
      const direction = info.offset.x > 0 ? 1 : -1;
      const yDirection = info.offset.y > 0 ? 1 : -1;
      
      animate(x, direction * 700, {
        type: 'tween',
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      });
      animate(y, yDirection * 100, {
        type: 'tween',
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => onSwipe(),
      });
    } else {
      // Spring back
      animate(x, 0, { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25,
      });
      animate(y, 0, { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25,
      });
    }
  };

  return (
    <motion.div
      style={{
        ...styles.cardWrapper,
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? dragRotate : 0,
        cursor: isTop ? (isFlipped ? 'grab' : 'pointer') : 'default',
        zIndex: totalVisible - index,
        touchAction: isTop && isFlipped ? 'none' : 'auto',
      }}
      initial={false}
      animate={{
        y: stackY,
        scale: stackScale,
        rotate: isTop ? 0 : stackTilt,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      drag={isTop && isFlipped ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={() => isTop && !isFlipped && onFlip()}
      whileTap={isTop && !isFlipped ? { scale: 0.98 } : {}}
      whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
    >
      <motion.div
        style={styles.cardInner}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 28,
        }}
      >
        {/* Front - Image + Title (or centered for intro card) */}
        <div style={styles.cardFront}>
          {card.id === 1 ? (
            // Intro card - centered text, no image
            <div style={styles.frontContentCentered}>
              <span style={styles.frontNumber}>0{card.id}</span>
              <h2 style={styles.frontTitleCentered}>{card.title}</h2>
              {isTop && (
                <motion.span 
                  style={styles.tapHint}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  tap to read
                </motion.span>
              )}
            </div>
          ) : (
            // Regular card - with image
            <>
              <div style={styles.frontImageWrapper}>
                <img 
                  src={card.image} 
                  alt={card.title}
                  style={styles.frontImage}
                />
                <div style={styles.frontOverlay} />
              </div>
              <div style={styles.frontContent}>
                <span style={styles.frontNumber}>0{card.id}</span>
                <h2 style={styles.frontTitle}>{card.title}</h2>
                {isTop && (
                  <motion.span 
                    style={styles.tapHint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    tap to read
                  </motion.span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Back - Message */}
        <div style={styles.cardBack}>
          <div style={styles.backContent}>
            <span style={styles.backNumber}>0{card.id}</span>
            <h3 style={styles.backTitle}>{card.title}</h3>
            <p style={{
              ...styles.backMessage,
              ...getMessageStyle(card.message.length)
            }}>{card.message}</p>
          </div>
          {isFlipped && isTop && (
            <motion.span 
              style={styles.swipeHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              drag to continue
            </motion.span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
export default function TangerineCards() {
  const [cards, setCards] = useState(initialCards);
  const [flippedId, setFlippedId] = useState(null);

  const handleFlip = () => {
    setFlippedId(cards[0].id);
  };

  const handleSwipe = () => {
    setFlippedId(null);
    setCards(prev => prev.slice(1));
  };

  const currentIndex = initialCards.length - cards.length + 1;
  const isFinished = cards.length === 0;

  const handleRestart = () => {
    setCards(initialCards);
    setFlippedId(null);
  };

  return (
    <div style={styles.container}>
      {/* Checkered Background */}
      <div style={styles.checkeredBg} />

      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>A message for you</h1>
        {/* <p style={styles.subtitle}>A message for you</p> */}
      </header>

      {/* Progress */}
      {!isFinished && (
        <div style={styles.progress}>
          <span style={styles.progressNum}>{currentIndex} / {initialCards.length}</span>
        </div>
      )}

      {/* Cards */}
      <div style={styles.deck}>
        {!isFinished ? (
          <>
            {cards.slice(0, 4).reverse().map((card, i) => {
              const actualIndex = cards.slice(0, 4).length - 1 - i;
              return (
                <Card
                  key={card.id}
                  card={card}
                  index={actualIndex}
                  totalVisible={Math.min(cards.length, 4)}
                  isFlipped={flippedId === card.id}
                  onFlip={handleFlip}
                  onSwipe={handleSwipe}
                />
              );
            })}
          </>
        ) : (
          <motion.div 
            style={styles.finaleCard}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <span style={styles.finaleEmoji}>🍊</span>
            <h2 style={styles.finaleTitle}>You are tangerine.</h2>
            <p style={styles.finaleMessage}>And it's more than enough.</p>
            <button style={styles.restartBtn} onClick={handleRestart}>
              Read again
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      {!isFinished && (
        <footer style={styles.footer}>
          <p style={styles.hint}>
            {flippedId ? 'Swipe left or right' : 'Tap the card'}
          </p>
        </footer>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100wv',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },

  // Baby blue checkered background
  checkeredBg: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    background: `
      linear-gradient(45deg, #e3f2fd 25%, transparent 25%),
      linear-gradient(-45deg, #e3f2fd 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #e3f2fd 75%),
      linear-gradient(-45deg, transparent 75%, #e3f2fd 75%)
    `,
    backgroundSize: '40px 40px',
    backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
    backgroundColor: '#bbdefb',
  },

  header: {
    textAlign: 'center',
    marginBottom: '16px',
  },

  title: {
    fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
    fontWeight: 600,
    color: '#1565c0',
    margin: 0,
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: 2
    // fontFamily: 'Georgia, "Times New Roman", serif',
    // fontStyle: 'italic',
  },

  // subtitle: {
  //   fontSize: '10px',
  //   color: '#64b5f6',
  //   letterSpacing: '2px',
  //   textTransform: 'uppercase',
  //   margin: 0,
  //   fontWeight: 500,
  // },

  progress: {
    marginBottom: '20px',
  },

  progressNum: {
    fontSize: '11px',
    color: '#1976d2',
    letterSpacing: '2px',
    fontWeight: 600,
    background: 'rgba(255,255,255,0.8)',
    padding: '5px 14px',
    borderRadius: '16px',
  },

  deck: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    height: 'min(68vh, 520px)',
    marginBottom: '20px',
  },

  cardWrapper: {
    position: 'absolute',
    inset: 0,
    transformStyle: 'preserve-3d',
  },

  cardInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },

  cardFront: {
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    background: '#ffffff',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    boxShadow: `
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 10px 20px rgba(0, 0, 0, 0.08),
      0 25px 50px rgba(0, 0, 0, 0.1)
    `,
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.06)',
  },

  frontImageWrapper: {
    position: 'absolute',
    inset: 0,
  },

  frontImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  frontOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)',
  },

  frontContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    color: '#fff',
  },

  // Centered content for intro card (no image)
  frontContentCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '24px',
    color: '#37474f',
  },

  frontTitleCentered: {
    fontSize: 'clamp(26px, 6vw, 34px)',
    fontWeight: 600,
    margin: 0,
    marginBottom: '16px',
    fontFamily: 'Georgia, "Times New Roman", serif',
    textAlign: 'center',
  },

  frontNumber: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '2px',
    opacity: 0.8,
    display: 'block',
    marginBottom: '6px',
  },

  frontTitle: {
    fontSize: 'clamp(22px, 5.5vw, 28px)',
    fontWeight: 600,
    margin: 0,
    marginBottom: '10px',
    fontFamily: 'Georgia, "Times New Roman", serif',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },

  tapHint: {
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    opacity: 0.7,
    fontWeight: 500,
  },

  cardBack: {
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    boxShadow: `
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 10px 20px rgba(0, 0, 0, 0.08),
      0 25px 50px rgba(0, 0, 0, 0.1)
    `,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },

  backContent: {
    flex: 1,
    width: '100%',
    padding: '24px',
    paddingBottom: '44px',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSizing: 'border-box',
  },

  backNumber: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '2px',
    color: '#90a4ae',
    marginBottom: '6px',
  },

  backTitle: {
    fontSize: 'clamp(13px, 3.5vw, 16px)',
    fontWeight: 600,
    color: '#42a5f5',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: 0,
    marginBottom: '16px',
  },

  backMessage: {
    color: '#37474f',
    // fontStyle: 'italic',
    margin: 0,
    fontFamily: 'Georgia, "Times New Roman", serif',
    width: '100%',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },

  swipeHint: {
    position: 'absolute',
    bottom: '14px',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '9px',
    color: '#b0bec5',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },

  // Finale
  finaleCard: {
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
    boxShadow: `
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 10px 20px rgba(0, 0, 0, 0.08),
      0 25px 50px rgba(0, 0, 0, 0.1)
    `,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    border: '1px solid rgba(0,0,0,0.06)',
  },

  finaleEmoji: {
    fontSize: 'clamp(48px, 10vw, 64px)',
    marginBottom: '16px',
  },

  finaleTitle: {
    fontSize: 'clamp(18px, 4vw, 24px)',
    color: '#1565c0',
    // fontFamily: 'Georgia, serif',
    // fontStyle: 'italic',
    margin: 0,
    marginBottom: '8px',
    textAlign: 'center',
  },

  finaleMessage: {
    fontSize: 'clamp(14px, 3vw, 16px)',
    color: '#64b5f6',
    margin: 0,
    marginBottom: '24px',
    // fontStyle: 'italic',
  },

  restartBtn: {
    fontSize: '11px',
    color: '#1976d2',
    background: 'transparent',
    border: '2px solid #1976d2',
    padding: '10px 24px',
    borderRadius: '24px',
    cursor: 'pointer',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },

  footer: {
    textAlign: 'center',
  },

  hint: {
    fontSize: '10px',
    color: '#1976d2',
    letterSpacing: '1px',
    margin: 0,
    background: 'rgba(255,255,255,0.8)',
    padding: '6px 16px',
    borderRadius: '16px',
  },
};