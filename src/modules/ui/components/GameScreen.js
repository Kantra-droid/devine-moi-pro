// Game Screen Component
const { Play, Trophy, Clock, RotateCcw, ArrowRight } = lucide;

window.GameScreen = ({ round, gameMode, timer, timeLeft, isTimerActive, currentWord, players, scores, handlers }) => {
    const getGameModeLabel = (mode) => {
        if (mode.includes('enfants')) return '👶 Enfants';
        if (mode.includes('adulte')) return '🧠 Adulte';
        return '🎯 Général';
    };
    
    const timerDisplay = timer === 300 ? '∞' : 
        `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
    
    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold">Round {round}</h2>
                    <p className="text-blue-100 text-sm">
                        {getGameModeLabel(gameMode)}
                    </p>
                </div>
                <div className="text-center">
                    <div className={`text-2xl font-bold ${
                        timeLeft <= 10 ? 'text-red-300 animate-pulse' : ''
                    }`}>
                        {timerDisplay}
                    </div>
                    <div className="flex space-x-1 mt-1">
                        <button 
                            onClick={handlers.toggleTimer} 
                            className={`p-1 rounded ${
                                isTimerActive ? 'bg-red-500/30' : 'bg-green-500/30'
                            }`}
                        >
                            <Play className="w-3 h-3" />
                        </button>
                        <button 
                            onClick={handlers.resetTimer} 
                            className="bg-white/20 p-1 rounded"
                        >
                            <RotateCcw className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Word to Guess */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 text-center slide-in">
                <h3 className="text-sm text-blue-100 mb-2">Mot à deviner :</h3>
                <div className="text-4xl font-bold mb-4 tracking-wider">
                    {currentWord?.word}
                </div>
                <div className="text-xs text-blue-100">
                    Montrez ces indices pour aider :
                </div>
            </div>
            
            {/* Hints */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6 slide-in">
                <h4 className="text-sm font-semibold mb-3 text-center">💡 Indices</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                    {currentWord?.hints.map((hint, index) => (
                        <span 
                            key={index} 
                            className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {hint}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* Player Buttons */}
            <div className="space-y-3 mb-6">
                <h4 className="text-center font-semibold">Qui a trouvé ?</h4>
                {players.map(player => (
                    <button
                        key={player}
                        onClick={() => handlers.awardPoint(player)}
                        className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold flex items-center justify-between hover:shadow-lg transition-all slide-in"
                    >
                        <span>{player}</span>
                        <span className="bg-blue-100 px-2 py-1 rounded text-sm">
                            {scores[player]} pts
                        </span>
                    </button>
                ))}
            </div>
            
            {/* Actions */}
            <div className="flex space-x-3">
                <button 
                    onClick={handlers.getNewWord}
                    className="flex-1 bg-white/20 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/30 transition-colors"
                >
                    <ArrowRight className="w-5 h-5" />
                    <span>Suivant</span>
                </button>
                <button 
                    onClick={handlers.viewScores}
                    className="flex-1 bg-white/20 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/30 transition-colors"
                >
                    <Trophy className="w-5 h-5" />
                    <span>Scores</span>
                </button>
            </div>
        </>
    );
};