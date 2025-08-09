// PWA Manager Module
window.pwaManager = {
    // Initialize PWA features
    init: ({ setIsPWA, setIsOnline, setDeferredPrompt, setShowInstallBanner }) => {
        // Check if app is in PWA mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
        setIsPWA(isStandalone || isFullscreen);
        
        // Handle online/offline status
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        // Handle install prompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show install banner after 3 seconds
            setTimeout(() => setShowInstallBanner(true), 3000);
        };
        
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        
        // Register Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/public/sw.js')
                    .then((registration) => {
                        console.log('SW registered:', registration);
                    })
                    .catch((error) => {
                        console.log('SW registration failed:', error);
                    });
            });
        }
        
        // Return cleanup function
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    },
    
    // Handle install click
    handleInstall: async (deferredPrompt, setShowInstallBanner, setDeferredPrompt) => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
                setShowInstallBanner(false);
            } else {
                console.log('User dismissed the install prompt');
            }
            
            setDeferredPrompt(null);
        }
    },
    
    // Check if PWA is supported
    isSupported: () => {
        return 'serviceWorker' in navigator && 
               'PushManager' in window && 
               'Notification' in window;
    },
    
    // Get PWA display mode
    getDisplayMode: () => {
        const displayModes = ['fullscreen', 'standalone', 'minimal-ui', 'browser'];
        
        for (const mode of displayModes) {
            if (window.matchMedia(`(display-mode: ${mode})`).matches) {
                return mode;
            }
        }
        
        return 'browser';
    }
};