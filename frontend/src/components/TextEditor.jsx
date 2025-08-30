import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "/api/change-tone";

export default function TextEditor() {
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);
    const [future, setFuture] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const changeTone = async (tone) => {
    try {
        setIsProcessing(true);
        setHistory((prev) => [...prev, text]);
        setFuture([]);

        const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
        });

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const data = await response.json();
        setText(data.result);
    } catch (err) {
        console.error("Error changing tone:", err);
    } finally {
        setIsProcessing(false);
    }
    };

    const undo = () => {
    if (!history.length) return;
    const prevText = history[history.length - 1];
    setFuture((f) => [text, ...f]);
    setText(prevText);
    setHistory((h) => h.slice(0, -1));
    };

    const redo = () => {
    if (!future.length) return;
    const nextText = future[0];
    setHistory((h) => [...h, text]);
    setText(nextText);
    setFuture((f) => f.slice(1));
    };

    const tones = [
    { name: "Formal", emoji: "👔", gradient: "from-slate-400 to-slate-600" },
    { name: "Casual", emoji: "😎", gradient: "from-orange-400 to-pink-500" },
    { name: "Polite", emoji: "🙏", gradient: "from-green-400 to-blue-500" },
    { name: "Friendly", emoji: "😊", gradient: "from-yellow-400 to-orange-500" },
    { name: "Professional", emoji: "💼", gradient: "from-blue-500 to-purple-600" },
    { name: "Funny", emoji: "😂", gradient: "from-pink-400 to-red-500" },
    { name: "Serious", emoji: "🎯", gradient: "from-gray-600 to-gray-800" },
    { name: "Creative", emoji: "🎨", gradient: "from-purple-500 to-pink-600" },
    { name: "Persuasive", emoji: "💪", gradient: "from-red-500 to-orange-600" },
    ];

    return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      {/* Floating background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            ✨ Tone Transform
            </h1>
            <p className="text-lg text-gray-600 font-medium">
            Transform your text with AI-powered tone adjustment
            </p>
        </div>

        <div className="flex gap-8 h-[calc(100vh-200px)]">
          {/* Left: Text Area */}
            <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Text</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {text.length} characters
                </div>
            </div>

            <div className="relative flex-1">
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing your message here... ✍️"
                className="w-full h-full p-6 rounded-2xl border-2 border-gray-200 shadow-inner focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 focus:outline-none text-gray-800 resize-none transition-all duration-300 text-lg leading-relaxed bg-gray-50/50"
                disabled={isProcessing}
                />
            
                {isProcessing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Transforming your text...</p>
                    </div>
                </div>
                )}
            </div>

            {/* Undo/Redo */}
            <div className="flex gap-4 mt-6 justify-end">
                <button
                onClick={undo}
                disabled={!history.length || isProcessing}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center gap-2"
                >
                ↶ Undo
                </button>
                <button
                onClick={redo}
                disabled={!future.length || isProcessing}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center gap-2"
                >
                ↷ Redo
                </button>
            </div>
            </div>

          {/* Right: Tone Picker */}
            <div className="w-80 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 flex flex-col">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Tone</h2>
                <p className="text-gray-600">Click any tone to transform your text</p>
            </div>

            <div className="grid grid-cols-3 gap-3 flex-1">
                {tones.map((tone, i) => (
                <button
                    key={i}
                    onClick={() => changeTone(tone.name)}
                    disabled={!text.trim() || isProcessing}
                    className={`group relative p-4 rounded-xl bg-gradient-to-br ${tone.gradient} text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 overflow-hidden aspect-square flex flex-col items-center justify-center`}
                >
                  {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                    <div className="relative z-10 flex flex-col items-center gap-1">
                    <span className="text-xl">{tone.emoji}</span>
                    <span className="text-xs font-semibold text-center leading-tight">{tone.name}</span>
                    </div>
                </button>
                ))}
            </div>

            {/* Status indicator */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 text-center">
                {!text.trim() ? (
                <p className="text-gray-500 text-sm">💡 Type some text to get started</p>
                ) : isProcessing ? (
                <p className="text-purple-600 text-sm font-medium">🔄 Processing...</p>
                ) : (
                <p className="text-green-600 text-sm font-medium">✅ Ready to transform</p>
                )}
            </div>
            </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
        
        </div>
        </div>
    </div>
    );
}