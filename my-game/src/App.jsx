import { useState } from 'react'

function App() {
  const [gameState, setGameState] = useState('playing');
  const [sequence, setSequence] = useState([]);
  const renderGame = () => (
    <div className="flex flex-col items-center">
      <h2 className="text-white text-2xl mb-6">จำลำดับไว้ไว้ซะ</h2>
      <div className="grid grid-cols-3 gap-4 bg-slate-800 p-6 rounded-xl shadow-2xl">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
        <button
          key={id}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-700 rounded-lg transition-all duration-300"
        />
        ))}
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {gameState == 'playing' && renderGame()}
    </div>
  )
}
export default App