// App Status Component
const { Wifi, WifiOff } = lucide;

window.AppStatus = ({ isPWA, isOnline }) => {
    return (
        <div className="flex items-center justify-between mb-4 text-xs">
            <div className="flex items-center space-x-2">
                {isPWA && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                        📱 App
                    </span>
                )}
                {isOnline ? (
                    <span className="flex items-center space-x-1 text-green-400">
                        <Wifi className="w-3 h-3" />
                        <span>En ligne</span>
                    </span>
                ) : (
                    <span className="flex items-center space-x-1 text-orange-400">
                        <WifiOff className="w-3 h-3" />
                        <span>Hors ligne</span>
                    </span>
                )}
            </div>
        </div>
    );
};