
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Music, Play, Pause, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import Snowfall from './components/Snowfall';
import { Penguin } from './components/Penguin';
import musicUrl from './musicletter.mp3'; 

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const letterRef = useRef<HTMLDivElement | null>(null);
  const hasCelebrated = useRef(false);

const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true); // Update state icon
    
    // Play the music when the user clicks the envelope
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

    // Trigger initial confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFC0CB', '#B0E0E6', '#FFFFFF']
    });
  };

const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // 添加一个 catch 来捕获错误，防止控制台报红
        audioRef.current.play().catch(error => {
            console.error("播放出错:", error);
            // 如果是因为没有用户交互，通常点击按钮后再次 play 就能成功
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const checkScroll = useCallback(() => {
    if (!letterRef.current || hasCelebrated.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // Check if we are near the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      hasCelebrated.current = true;
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.8 },
        colors: ['#FFC0CB', '#B0E0E6', '#FFFFFF', '#FFD700']
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-pink-50 flex flex-col items-center pt-8 pb-12 px-4 relative">
      <Snowfall />

      {/* !!! 修改 2: 这里使用导入的 musicUrl 变量 */}
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        onEnded={() => setIsPlaying(false)}
      />

      {!isOpen ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-md perspective-1000">
          <div className="relative group cursor-pointer" onClick={handleOpen}>
            {/* Peeking Penguins around the envelope */}
            <Penguin className="absolute -top-12 -left-8 -rotate-12 z-0" />
            <Penguin className="absolute -bottom-8 -right-8 rotate-12 z-0" />
            
            <div className="w-80 h-56 bg-white rounded-lg shadow-2xl relative border-2 border-blue-100 flex items-center justify-center transition-transform group-hover:scale-105 duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-100 border-b-2 border-blue-200 origin-top transition-transform duration-700 group-hover:-rotate-x-180 z-20"></div>
              <Heart className="text-pink-400 fill-pink-400 animate-pulse" size={48} />
              <div className="absolute bottom-4 text-blue-400 font-bold text-lg">点我开启惊喜</div>
            </div>
          </div>
          <p className="mt-8 text-blue-500 text-center animate-bounce">
            有一封给你的信 🐧✨
          </p>
        </div>
      ) : (
        <div className="w-full max-w-2xl mt-10 relative">
          {/* Peeking Penguins - SVG */}
          <Penguin className="absolute -top-16 left-10 z-20" />
          <Penguin className="absolute -top-12 right-20 z-20 scale-x-[-1] rotate-12" />
          
          <div 
            className="bg-white p-8 md:p-12 rounded-2xl shadow-xl relative border-t-8 border-pink-200 animate-[fadeIn_1s_ease-out]"
            style={{ animation: 'slideUp 1s ease-out' }}
          >
            {/* Decorative background lines to mimic paper */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{
                backgroundImage: 'repeating-linear-gradient(white 0px, white 31px, #E0E7FF 32px)',
                backgroundPosition: '0 30px'
              }}
            ></div>

            <div className="relative z-10 space-y-8 letter-content text-gray-700 text-lg md:text-xl leading-relaxed">
              <p>
                嘿嘿 虽然这封‘信’与礼物将在很久之后才会被你收到，因此我也想独特一些，别人都是用手信写在一张纸上然后绑在玩偶的脖子上然后给你发现，因此用了另一种新颖的方式给你看到（虽然这封信也含有风险， 就是你有可能将会把这标签直接丢进垃圾桶里哈哈哈哈哈）可是你都到达了这个程序，也正读这此段落， 那就恭喜你 你好细节呀姐姐（害羞+感动表情包）。这就是隐藏彩蛋？ 惊喜？惊吓应该不可能吧嘿嘿。毕竟第一次做这种的， 有bug就忽略吧嘿嘿
              </p>

              <p>
                好吧我们算下来也有超过10年了， 写那种催情手信也写不出什么（hmmm可能都写过了？idk）但是还是觉得有点不好意思 我到最后还是选择在kl读书 hmmmm 毕竟之前和你讲过我在png。 想知道原因嘛 你应该也知道吧 but我不知道你知道是什么原因 so你来问我也行嘿嘿。虽然我感觉你应该是不后悔选择ipg 可是感觉那边有点像监狱 还是说声加油吧
              </p>

              <p>
                歌词为什么会选这个呢，这是一个非常好的问题 有两个歌突然从我脑海里蹦了出来 两首你都蛮喜欢的 原本要选第57次取消发送，可是这个是关于单相思的歌 所以选了另外一个，撒野 这个之前你也很喜欢 就选择了它（虽然你应该很久没听了？ 一边听着一边顺便给你打开回忆录也可以）
              </p>

              <p>
                最后也就是别嫌弃这迟来的礼物吧（哭哭） 还有我那糟糕的文笔（别指望一个打小文笔就很烂的人会写一个诺贝尔文学奖水准的文笔的信哈哈哈哈哈） 说真的我也很想念读你写的小说的时光了 毕竟你最近好像过的蛮牛马生活的 所以不指望你有空写这个玩意（摇头叹息 仰望被天花板遮住的天空）有点抽象 开透视挂了
              </p>

              <div className="pt-12 flex flex-col items-end text-pink-500 font-bold">
                <div className="flex items-center space-x-2">
                  <span>来自亲爱的吴帅</span>
                  <Heart size={16} fill="currentColor" />
                </div>
                <div>2025年11月01日</div>
              </div>
            </div>

            {/* Side Penguins peeking */}
            <Penguin className="absolute -right-6 top-1/2 -translate-y-1/2 rotate-90 z-20" />
            <Penguin className="absolute -left-6 bottom-40 -rotate-90 z-20" />
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-pink-400">🐧</div>
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-blue-400">✨</div>
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-pink-400">🎂</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;
