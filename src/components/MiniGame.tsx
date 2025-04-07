import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apple from "../assets/snake/apple-food.png";
import star from "../assets/snake/powerup-star.png";
import levelupbadge from "../assets/snake/level-up-badge.png";
import snakeBody from "../assets/snake/snakeBody.png";
import snakeHead from "../assets/snake/snakeHead.png";
import title from "../assets/snake/arcade-title.png";

// Make tile size responsive based on screen width
const calculateTileSize = () => {
  const width = window.innerWidth;
  if (width < 480) return 20; // Mobile
  if (width < 768) return 25; // Tablet
  return 30; // Desktop
};

const GRID_WIDTH = 20;
const GRID_HEIGHT = 10;

export default function MiniGame() {
  const [tileSize, setTileSize] = useState(calculateTileSize());
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState({ x: 2, y: 2 });
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState<number[]>(() => {
    const saved = localStorage.getItem("snake-xp-highscores");
    return saved ? JSON.parse(saved) : [];
  });
  const [isRunning, setIsRunning] = useState(false);
  const [powerUp, setPowerUp] = useState<{ x: number; y: number } | null>(null);
  const [powerUpTimer, setPowerUpTimer] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const powerUpTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setTileSize(calculateTileSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (!isRunning || countdown > 0) return;
    if (gameInterval.current) clearInterval(gameInterval.current);

    gameInterval.current = setInterval(() => {
      setSnake((prev) => {
        const newHead = { ...prev[0] };
        if (direction === "UP") newHead.y -= 1;
        if (direction === "DOWN") newHead.y += 1;
        if (direction === "LEFT") newHead.x -= 1;
        if (direction === "RIGHT") newHead.x += 1;

        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= GRID_WIDTH ||
          newHead.y >= GRID_HEIGHT ||
          prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          const updatedScores = [...highScores, score].sort((a, b) => b - a).slice(0, 5);
          setHighScores(updatedScores);
          localStorage.setItem("snake-xp-highscores", JSON.stringify(updatedScores));
          setIsRunning(false);
          setShowGameOver(true);
          setTimeout(() => setShowGameOver(false), 2500);
          return [{ x: 5, y: 5 }];
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          const newScore = score + 1;
          setScore(newScore);
          setFood({
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT),
          });
          if (newScore % 5 === 0 && newScore !== 0) {
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 2000);
          }
          if (Math.random() < 0.3) {
            const newPowerUp = {
              x: Math.floor(Math.random() * GRID_WIDTH),
              y: Math.floor(Math.random() * GRID_HEIGHT),
            };
            setPowerUp(newPowerUp);
            setPowerUpTimer(100);
            if (powerUpTimeoutRef.current) clearTimeout(powerUpTimeoutRef.current);
            powerUpTimeoutRef.current = setTimeout(() => {
              setPowerUp(null);
              setPowerUpTimer(0);
            }, 5000);
          }
          return newSnake;
        } else if (powerUp && newHead.x === powerUp.x && newHead.y === powerUp.y) {
          setScore((s) => s + 3);
          setPowerUp(null);
          setPowerUpTimer(0);
          if (powerUpTimeoutRef.current) clearTimeout(powerUpTimeoutRef.current);
          return newSnake;
        } else {
          newSnake.pop();
          return newSnake;
        }
      });
    }, 150);

    return () => clearInterval(gameInterval.current!);
  }, [direction, food, powerUp, isRunning, countdown]);

  const startGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setDirection("RIGHT");
    setScore(0);
    setPowerUp(null);
    setPowerUpTimer(0);
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownInterval);
          setIsRunning(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-black px-4 py-6 font-arcade relative overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-green-400 mb-4 drop-shadow-md">
          <img src={title} alt="Snake XP" className="w-48 md:w-64 h-auto" />
        </h2>

        <AnimatePresence>
          {showGameOver && (
            <motion.div
              key="game-over"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-[url('/gameover-bg.png')] bg-cover bg-center z-50 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="text-red-400 text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-center px-4"
              >
                💀 GAME OVER 💀
              </motion.div>
              <p className="text-white text-xl mb-6">Score: {score} XP</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded shadow-lg"
              >
                Restart Game
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {countdown > 0 && (
          <motion.div
            key={countdown}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-4xl md:text-6xl text-yellow-300 font-bold mb-4"
          >
            {countdown}
          </motion.div>
        )}

        <p className="text-white mb-2 text-sm md:text-base">Use Arrow Keys to play</p>
        <p className="text-pink-300 mb-4 text-lg md:text-xl">Score: {score}</p>
        <button
          onClick={startGame}
          className="mb-4 px-4 md:px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-yellow-500 hover:to-red-500 text-white text-base md:text-lg font-extrabold rounded-lg shadow-lg transition-all"
        >
          {isRunning || countdown < 3 ? "Restart Game" : "Play Game"}
        </button>

        <div
          className="relative bg-[#1b1b1b] border-4 border-green-400 shadow-2xl rounded-xl overflow-hidden"
          style={{
            width: tileSize * GRID_WIDTH,
            height: tileSize * GRID_HEIGHT,
            maxWidth: '100%',
            aspectRatio: `${GRID_WIDTH}/${GRID_HEIGHT}`
          }}
        >
          <AnimatePresence>
            {showLevelUp && (
              <motion.img
                key="level-up"
                src={levelupbadge}
                alt="Level Up!"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ width: tileSize * 3, height: tileSize * 3 }}
              />
            )}
          </AnimatePresence>

          {snake.map((segment, index) => (
            <motion.img
              key={index}
              src={index === 0 ? snakeHead : snakeBody}
              alt="segment"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute"
              style={{
                width: tileSize,
                height: tileSize,
                left: segment.x * tileSize,
                top: segment.y * tileSize,
              }}
            />
          ))}

          <motion.img
            src={apple}
            alt="food"
            className="absolute"
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            style={{
              width: tileSize,
              height: tileSize,
              left: food.x * tileSize,
              top: food.y * tileSize,
            }}
          />

          {powerUp && (
            <motion.img
              src={star}
              alt="power-up"
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{
                width: tileSize,
                height: tileSize,
                left: powerUp.x * tileSize,
                top: powerUp.y * tileSize,
              }}
            />
          )}
        </div>

        {powerUp && powerUpTimer > 0 && (
          <div className="w-full max-w-[400px] mt-3 h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-yellow-400"
            />
          </div>
        )}

        <div className="mt-6 text-white w-full max-w-md px-4">
          <h3 className="text-xl md:text-2xl mb-2 text-yellow-300 animate-pulse">🏆 Leaderboard</h3>
          <ul className="list-decimal pl-5 text-base md:text-lg">
            {highScores.length === 0 && <li className="text-gray-400">No scores yet.</li>}
            {highScores.map((score, i) => (
              <li key={i} className="text-green-300">
                {score} XP
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}