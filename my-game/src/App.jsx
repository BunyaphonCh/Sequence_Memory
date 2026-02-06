import { useState, useEffect } from 'react'

function App() {
  const [gameState, setGameState] = useState('playing');
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [litButton, setLitButton] = useState(null);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [message, setMessage] = useState("กดปุ่ม Start เพื่อเริ่มเกม");
  const [noButtonPos, setNoButtonPos] = useState({top: '50%', left: '60%'});

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
    const speed = Math.max(200, 600 - (sequence.length * 40));
    const gap = Math.max(50, 200 - (sequence.length * 10));
    for (let i = 0; i < sequence.length; i++) {
      setLitButton(sequence[i]);
      await new Promise(r => setTimeout(r, speed));
      setLitButton(null);
      await new Promise(r => setTimeout(r, gap));
    }
    setIsShowingSequence(false);
    setMessage("ตาคุณเเล้ว");
  };

  const handleButtonClick = (id) => {
    if (isShowingSequence || sequence.length === 0) return;
    const newUserSequence = [...userSequence, id];
    setUserSequence(newUserSequence);
    setLitButton(id);
    setTimeout(() => setLitButton(null), 150);
    const currentIndex = newUserSequence.length - 1;

    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      setMessage(`Game over เเว้ว ทำได้ ${sequence.length - 1} คะเเนน`)
      setSequence([]);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      const nextLevel = sequence.length + 1;

      if (nextLevel > 5) {
        setTimeout(() => {
          setGameState('gift');
        }, 500);
      } else {
        setMessage("เริ่ด");
        setTimeout(() => {
          addToSequence();
        }, 800)
      }
    }

    if (newUserSequence.length === sequence.length) {
      setMessage("ตึงจัดด")
      setTimeout(() => {
        addToSequence();
      }, 800);
    }
  }

  const renderGiftScene = () => (
    <div className="flex flex-col items-center animate-bounce">
      <h2 className="text-white text-2xl mb-8 font-bold">เริ่ดมาก มีอะไรจะให้ด้วยเเหละ</h2>
      <button
        onClick={() => setGameState('final')}
        className="text-8xl hover:scale-110 transition-transform active:scale-95 cursor-pointer"
        >
          🎁
        </button>
        <p className="text-slate-400 mt-6 italic">ลองกดที่กล่องเพื่อเปิดดู...</p>
    </div>
  )

  // return (
  //   <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
  //     <h1 className="text-white text-3xl font-bold mb-8">MEMORY GAME 🧠</h1>
  //     {/* ส่วนแสดงข้อความแจ้งเตือนสถานะเกม */}
  //     <div className={`mb-6 px-6 py-2 rounded-full font-medium transition-all ${
  //       message.includes('จบเกม') ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/10 text-cyan-400'
  //     }`}>
  //       {message}
  //   </div>

  // {/* ... ส่วนของปุ่ม Start และ Grid เกมเหมือนเดิม ... */}

  //     {/* ถ้ายังไม่ได้เริ่ม หรืออยากเริ่มใหม่ */}
  //     {sequence.length === 0 && (
  //       <button 
  //         onClick={addToSequence}
  //         className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg transition-all active:scale-90"
  //       >
  //         START GAME
  //       </button>
  //     )}

  //     {/* ตารางเกมที่รองรับมือถือ (Responsive Grid) */}
  //     {sequence.length > 0 && (
  //       <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-[350px]">
  //         {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
  //           <button
  //             key={id}
  //             onClick={() => handleButtonClick(id)}
  //             disabled={isShowingSequence} // ห้ามกดตอนไฟโชว์
  //             className={`aspect-square rounded-xl transition-all duration-200 
  //               ${id === litButton 
  //                 ? 'bg-cyan-400 shadow-[0_0_40px_#22d3ee] scale-95' 
  //                 : 'bg-slate-700 active:bg-slate-600'
  //               } ${isShowingSequence ? 'cursor-not-allowed' : 'cursor-pointer'}`}
  //             // เดี๋ยวเราจะมาใส่ onClick ให้ปุ่มพวกนี้กัน
  //           />
  //         ))}
  //       </div>
  //     )}

  //     <div className="mt-8 text-slate-400 font-medium">
  //       {sequence.length > 0 && `Level: ${sequence.length}`}
  //     </div>
  //   </div>
  // )
  return (
  <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
    {gameState === 'playing' && <h1 className="text-white text-3xl font-bold mb-4">MEMORY GAME 🧠</h1>}

    {gameState === 'playing' && (
      <>
        <div className={`mb-6 px-6 py-2 rounded-full font-medium transition-all ${
          message.includes('จบเกม') ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/10 text-cyan-400'
        }`}>
          {message}
        </div>

        {sequence.length === 0 && (
          <button onClick={addToSequence} className="bg-cyan-500 text-white px-8 py-3 rounded-full font-bold text-xl active:scale-90">
            START GAME
          </button>
        )}

        {sequence.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-slate-800 p-4 rounded-2xl w-full max-w-[350px]">
            {[0,1,2,3,4,5,6,7,8].map((id) => (
              <button
                key={id}
                onClick={() => handleButtonClick(id)}
                className={`aspect-square rounded-xl transition-all ${
                  id === litButton ? 'bg-cyan-400 shadow-[0_0_40px_#22d3ee]' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        )}
      </>
    )}

    {gameState === 'gift' && renderGiftScene()}

    {gameState === 'final' && (
      <div className="text-white text-center">
        <h2 className="text-3xl mb-4">💌 จดหมายถึงเธอ...</h2>
      </div>
    )}
  </div>
);
}

export default App