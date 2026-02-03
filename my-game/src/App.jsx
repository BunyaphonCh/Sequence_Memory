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
  }
  // const testGlow = () => {
  //   setLitButton(4);
  //   setTimeout(() => setLitButton(null), 500);
  // };
  // const renderGame = () => (
  //   <div className="flex flex-col items-center">
  //   </div>
  // );
  // return (
  //   <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
  //     <h1 
  //       onClick={testGlow}
  //       className='text-white text-4xl font-bold mb-10 tracking-widest drop-shadow-md'
  //     >
  //       Memory Game
  //     </h1>
  //     {gameState == 'playing' && (
  //       <div className="grid grid-cols-3 gap-4 bg-slate-800 p-6 rounded-2xl shadow-2xl">
  //       {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
  //       <button
  //         key={id}
  //         className={`w-20 h-20 sm:w-24 sm:h-24 bg-slate-700 rounded-lg transition-all duration-200"
  //         ${id == litButton
  //           ? 'bg-cyan-400 shadow-[0_0_30px_#22d3ee] scale-105'
  //           : 'bg-slate-700 hover:bg-slate-600'
  //         }`}
  //       />
  //       ))}
  //     </div>
  //     )}
  //     <p className="text-slate-400 mt-8 text-lg">Yo, don't forget the sequence!</p>
  //   </div>
  // )
}
export default App