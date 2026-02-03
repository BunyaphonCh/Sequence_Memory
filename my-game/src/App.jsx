import { useState } from 'react'

function App() {
  const [gameState, setGameState] = useState('playing');
  const [litButton, setLitButton] = useState(null);
  const testGlow = () => {
    setLitButton(4);
    setTimeout(() => setLitButton(null), 500);
  };
  const renderGame = () => (
    <div className="flex flex-col items-center">
    </div>
  );
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <h1 
        onClick={testGlow}
        className='text-white text-4xl font-bold mb-10 tracking-widest drop-shadow-md'
      >
        Memory Game
      </h1>
      {gameState == 'playing' && (
        <div className="grid grid-cols-3 gap-4 bg-slate-800 p-6 rounded-2xl shadow-2xl">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
        <button
          key={id}
          className={`w-20 h-20 sm:w-24 sm:h-24 bg-slate-700 rounded-lg transition-all duration-200"
          ${id == litButton
            ? 'bg-cyan-400 shadow-[0_0_30px_#22d3ee] scale-105'
            : 'bg-slate-700 hover:bg-slate-600'
          }`}
        />
        ))}
      </div>
      )}
      <p className="text-slate-400 mt-8 text-lg">จำลำดับไว้ไว้ซะ</p>
    </div>
  )
}
export default App