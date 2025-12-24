import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import './MazeGame.css' // Import maze styles
import MazeGame from './MazeGame' // Import Maze Component
import wreathImg from '/wreath.png' // Vite public dir access
import bearsImg from '/bears.png'
import catRetryImg from '/cat_retry.png'

function App() {
  const [step, setStep] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.log("Playback failed", e))
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  const handleStart = () => {
    setStep(1)
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(e => console.log("Playback failed", e))
      setIsMusicPlaying(true)
    }
  }

  // Card transition variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        bounce: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      filter: "blur(10px)",
      transition: { duration: 0.4 }
    }
  }

  // Wreath floating animation
  const floatVariants = {
    float: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="app-container">
      <audio ref={audioRef} loop>
        <source src="/perfect.mp3" type="audio/mp3" />
      </audio>

      <motion.button
        className="music-toggle"
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMusicPlaying ? '🎵' : '🔇'}
      </motion.button>

      <AnimatePresence mode='wait'>
        {step === 0 && (
          <motion.div
            key="step0"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <motion.div
              className="image-container"
              variants={floatVariants}
              animate="float"
            >
              <img src={wreathImg} alt="Christmas Wreath with Cat" className="wreath-img" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="title-red">MERRY<br />CHRISTMAS</h1>
              <p className="date-text">(25 December 2025)</p>
            </motion.div>

            <motion.p
              className="sub-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Press the button to continue!!
            </motion.p>

            <motion.button
              className="btn-primary"
              onClick={handleStart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Next!! ^w^
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <motion.div
              className="image-container"
              variants={floatVariants}
              animate="float"
            >
              <img src={wreathImg} alt="Christmas Wreath with Cat" className="wreath-img" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <h1 className="title-cursive">merry christmas<br />baby</h1>
            </motion.div>

            <motion.p
              className="question-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Do you want to open this?
            </motion.p>

            <motion.p
              className="kaomoji"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              " / ( ^ o ^ ) / "
            </motion.p>

            <div className="button-group">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
              >
                Open
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(3)}
              >
                Do not open
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <motion.div
              className="image-container"
              variants={floatVariants}
              animate="float"
            >
              <img src={bearsImg} alt="Cute Bears Hugging" className="wreath-img" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="title-game">Game Details</h1>
            </motion.div>

            <motion.p
              className="sub-text"
              style={{ fontSize: '1.1rem', lineHeight: '1.4', fontWeight: '600' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Before you open the message,<br />
              let's play a little game! <br />
              ( ^ w ^ )
            </motion.p>
            <motion.p
              className="sub-text"
              style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Finish the maze to unlock it!
            </motion.p>

            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(4)} // Go to Maze Game
            >
              Start Game &gt;
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <motion.div
              className="image-container"
              variants={floatVariants}
              animate="float"
            >
              <img src={catRetryImg} alt="Sad Cat" className="wreath-img" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="question-text" style={{ marginTop: '1rem' }}>
                "Ohh.. Let's try again,<br />okay, baby? {'>'}__&lt;"
              </p>
            </motion.div>

            <motion.button
              className="btn-primary"
              style={{ marginTop: '1rem' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(1)}
            >
              Retry
            </motion.button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MazeGame onWin={() => setStep(5)} />
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <motion.div
              className="image-container"
              variants={floatVariants}
              animate="float"
            >
              <img src={bearsImg} alt="Bears" className="wreath-img" />
            </motion.div>
            <div style={{ textAlign: 'center' }}>
              <h1 className="title-cursive">Oluwadarasimi Found Zenith</h1>
              <p className="sub-text" style={{ margin: '1rem 0' }}>
                You are amazing! ❤️
              </p>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(6)}
              >
                Open Letter
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="step6"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <h1 className="title-game" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              One last question...
            </h1>
            <p className="question-text">
              Do you love <br />
              <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Makinde Oluwadarasimi Enoch</span>?
            </p>

            <div className="button-group" style={{ marginTop: '2rem', position: 'relative', height: '60px' }}>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(7)}
                style={{ position: 'absolute', left: '20px' }}
              >
                Yes! ❤️
              </motion.button>

              <motion.button
                className="btn-secondary"
                style={{
                  position: 'absolute',
                  right: '20px',
                  fontSize: '0.8rem',
                  padding: '0.5rem 1rem'
                }}
                onMouseEnter={(e) => {
                  const btn = e.target;
                  const card = btn.closest('.card');
                  if (card) {
                    const cardRect = card.getBoundingClientRect();
                    const x = Math.random() * (cardRect.width - 100);
                    const y = Math.random() * (cardRect.height - 50);
                    btn.style.left = `${x}px`;
                    btn.style.top = `${y}px`;
                    btn.style.right = 'auto'; // clear right
                    btn.style.position = 'absolute';
                  }
                }}
                onClick={() => alert("Hey, why are you trying to click this? 😢")}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 7 && (
          <motion.div
            key="step7"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
            style={{ maxWidth: '400px', padding: '0', overflow: 'hidden' }}
          >
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <img src="/moonlight.png" alt="Moonlight" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '2rem', textAlign: 'left', maxHeight: '50vh', overflowY: 'auto' }} className="letter-content">
              <h2 className="title-cursive" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#880e4f' }}>To my only one.</h2>

              <p className="sub-text" style={{ textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                "You're literally the dream I never want to wake up from. These past few months have me completely hooked—head spinning, everything in me screaming your name. You're the fire in my veins that I can't put out, and honestly? I don't even want to."
              </p>

              <p className="sub-text" style={{ textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                "Real talk: I'm obsessed with you. Your smile is my happiness, every look from you is everything. My thoughts are constantly weaving around you—it's wild how much space you take up in my mind."
              </p>

              <p className="sub-text" style={{ textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                "Life before you was so gray, just noise. But now? It's full of color next to you. You flipped my world upside down, and I'm not looking for a way out. I want to drown in this, in you, deeper every day."
              </p>
              <p className="sub-text" style={{ textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem', fontWeight: 'bold' }}>
                "You are my paradise, my absolute delight. I'm yours, no questions asked. Your body is a whole meat pie 🥧, your smile is a solid 10/10, and your heart is just as beautiful as you are."
              </p>

              <p className="sub-text" style={{ textAlign: 'right', fontSize: '1rem', marginTop: '2rem', fontFamily: 'Dancing Script' }}>
                Happy holidays, my love, <br />
                - Makinde
              </p>
            </div>
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
              <motion.button
                className="btn-secondary"
                style={{ width: '100%' }}
                onClick={() => setStep(0)}
              >
                Start Over ❤️
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

