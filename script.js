/**
 * Oracle Cloud Instance Auto-Retry
 * Usage: Paste in console after filling instance form
 * Commands: stopRetry() or changeInterval(seconds)
 * Console filter: ORACLE-RETRY
 */

(function () {
    let INTERVAL = 180; // Set to 180 seconds (3 minutes)
    let attempts = 0;
    let running = true;

    const log = (msg) => console.log('[ORACLE-RETRY] ' + msg);

    // Beep function to alert on success
    function beep(frequency = 440, duration = 200) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = frequency;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + duration / 1000);
    }

    window.stopRetry = () => {
        running = false;
        log('🛑 Stopped');
    };

    window.changeInterval = (s) => {
        INTERVAL = Math.max(1, s);
        log('⚙️  Interval changed to ' + INTERVAL + 's');
    };

    function retry() {
        if (!running) return;

        attempts++;
        log(`[${new Date().toLocaleTimeString()}] Attempt #${attempts}`);

        const createBtn =
            document.querySelector('button[aria-label="Create"]') ||
            document.querySelector('button[aria-label="create"]');

        if (!createBtn) {
            log('  ❌ Button not found');
            setTimeout(retry, INTERVAL * 1000);
            return;
        }

        log('  🔵 Clicking...');
        createBtn.click();

        setTimeout(() => {
            const text = document.body.innerText.toLowerCase();

            if (text.includes('out of capacity')) {
                log('  ❌ Out of capacity');
                setTimeout(retry, INTERVAL * 1000);
                log(' >> Trying again in ' + INTERVAL + 's...');
            } else if (
                text.includes('provisioning') ||
                text.includes('creating') ||
                text.includes('work request')
            ) {
                log('🎉 SUCCESS! Instance created!');
                beep(440, 600000); // Triggers the 10-minute alert beep
                running = false;
            } else {
                log('  ⏳ Unknown response - retrying');
                setTimeout(retry, INTERVAL * 1000);
            }
        }, 3000);
    }

    log('Oracle Auto-Retry Started');
    log('Interval: ' + INTERVAL + 's');
    log('Commands: stopRetry() | changeInterval(seconds)');
    log('');
    setTimeout(retry, 2000);
})();
