import { useState } from 'react'

function App() {
  const [gameState, setGameState] = useState('playing');
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [litBution, setLitButton] = useState(null);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const addToSequence = () => {
    const newRandomNumber = Math.floor(Math.random() * 9);
    setSequence((prev) => [...prev, newRandomNumber]);
    setUserSequence([]);
  };
  useEffect(() => {
    if (sequence.length > 0) {
      showSequence();
    }
  }, [sequence]);
  const showSequence = async () => {
    setIsShowingSequence(true);
    for (let i = 0; i < sequence.length; i++) {
      const buttonId = sequence[i];
      setLitButon(buttonId);
      await new Promise(resolve => setTimeout(resolve, 600));
      setLitButton(null);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setIsShowingSequence(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 touch-none">
      <h1 className="text-white text-3xl font-bold mb-8 tracking-tighter">MEMORY GAME</h1>
      {sequence.length === 0 && (
        <button
          onClick={addToSequence}
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg transition-all active:scale-90">
            START GAME
        </button>
      )}
      {sequence.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-[350px]">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
            <button
              key={id}
              disabled={isShowingSequence}
              className={`aspect-square rounded-xl transition-all duration-200
                ${id === litButton
                  ? 'bg-cyan-400 shadown-[0_0_40px_#22d3ee] scale-95'
                  : 'bg-slate-700 active:bg-slate-600'
                } ${isShowingSequence ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
          ))}
        </div>
      )}
      <div className="mt-8 text-slate-400 font-medium">
        {sequence.length > 0 && `Level: ${sequence.length}`}
      </div>
    </div>
  )
  
}
export default App