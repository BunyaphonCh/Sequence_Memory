import { useState, useEffect } from 'react'

function App() {
  const [gameState, setGameState] = useState('playing');
  const [sequence, setSequence] = useState([]); // โจทย์
  const [userSequence, setUserSequence] = useState([]); // คำตอบ
  const [litButton, setLitButton] = useState(null); // ไฟที่กำลังสว่าง
  const [isShowingSequence, setIsShowingSequence] = useState(false);

  // 1. ฟังก์ชันสุ่มเลขใหม่
  const addToSequence = () => {
    const newRandomNumber = Math.floor(Math.random() * 9);
    setSequence((prev) => [...prev, newRandomNumber]);
    setUserSequence([]);
  };

  // 2. ฟังก์ชันฉายแสง (ดึงมาใช้เมื่อ sequence เปลี่ยนแปลง)
  useEffect(() => {
    if (sequence.length > 0) {
      showSequence();
    }
  }, [sequence]);

  const showSequence = async () => {
    setIsShowingSequence(true);
    for (let i = 0; i < sequence.length; i++) {
      setLitButton(sequence[i]);
      await new Promise(r => setTimeout(r, 600));
      setLitButton(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsShowingSequence(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 touch-none">
      <h1 className="text-white text-3xl font-bold mb-8 tracking-tighter">MEMORY GAME 🧠</h1>

      {/* ถ้ายังไม่ได้เริ่ม หรืออยากเริ่มใหม่ */}
      {sequence.length === 0 && (
        <button 
          onClick={addToSequence}
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg transition-all active:scale-90"
        >
          START GAME
        </button>
      )}

      {/* ตารางเกมที่รองรับมือถือ (Responsive Grid) */}
      {sequence.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-[350px]">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
            <button
              key={id}
              disabled={isShowingSequence} // ห้ามกดตอนไฟโชว์
              className={`aspect-square rounded-xl transition-all duration-200 
                ${id === litButton 
                  ? 'bg-cyan-400 shadow-[0_0_40px_#22d3ee] scale-95' 
                  : 'bg-slate-700 active:bg-slate-600'
                } ${isShowingSequence ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              // เดี๋ยวเราจะมาใส่ onClick ให้ปุ่มพวกนี้กัน
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