// Install Banner Component
const { X, Download } = lucide;

window.InstallBanner = ({ showInstallBanner, isPWA, handleInstallClick, setShowInstallBanner }) => {
    if (!showInstallBanner || isPWA) return null;
    
    return (
        <div className="install-banner">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">📱 Installez l'app!</h3>
                    <p className="text-white/90 text-sm">
                        Jouez en plein écran comme une vraie app
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleInstallClick}
                        className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>Installer</span>
                    </button>
                    <button
                        onClick={() => setShowInstallBanner(false)}
                        className="text-white/70 p-2"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};