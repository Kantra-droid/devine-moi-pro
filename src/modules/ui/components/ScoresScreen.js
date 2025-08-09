// Scores Screen Component
const { Play, RotateCcw } = lucide;

window.ScoresScreen = ({ round, players, scores, handlers }) => {
    const sortedPlayers = [...players].sort((a, b) => scores[b] - scores[a]);
    const winner = sortedPlayers[0];
    
    const getMedal = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `#${index + 1}`;
    };
    
    return (
        <>
            <div className="text-center mb-8 slide-in">
                <h1 className="text-3xl font-bold mb-2">🏆 Scores</h1>
                <p className="text-yellow-100">Round {round}</p>
            </div>
            
            {/* Podium */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 slide-in">
                <div className="text-center mb-6">
                    <div className="text-6xl mb-2 animate-bounce">👑</div>
                    <h2 className="text-2xl font-bold">{winner}</h2>
                    <p className="text-yellow-100">En tête avec {scores[winner]} points</p>
                </div>
                
                <div className="space-y-3">
                    {sortedPlayers.map((player, index) => (
                        <div 
                            key={player} 
                            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                index === 0 ? 'bg-yellow-400 text-yellow-900 shadow-lg' : 'bg-white/20'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="font-bold text-lg">
                                    {getMedal(index)}
                                </span>
                                <span className="font-semibold">{player}</span>
                            </div>
                            <span className="font-bold text-lg">{scores[player]} pts</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Actions */}
            <div className="space-y-3">
                <button 
                    onClick={handlers.newRound}
                    className="w-full bg-white text-orange-600 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-all slide-in"
                >
                    <Play className="w-6 h-6" />
                    <span>Continuer Round {round + 1}</span>
                </button>
                <button 
                    onClick={handlers.restartGame}
                    className="w-full bg-white/20 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/30 transition-all slide-in"
                >
                    <RotateCcw className="w-5 h-5" />
                    <span>Nouvelle partie</span>
                </button>
            </div>
        </>
    );
};