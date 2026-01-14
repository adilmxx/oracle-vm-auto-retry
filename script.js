/**
 * Oracle Cloud Instance Auto-Retry
 * Usage: Paste in console after filling instance form
 * Commands: stopRetry() or changeInterval(seconds)
 * Console filter: ORACLE-RETRY
 */

(function () {
    let INTERVAL = 70;
    let attempts = 0;
    let running = true;

    const log = (msg) => console.log('[ORACLE-RETRY] ' + msg);

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

            if (text.includes('out of capacity') || text.includes('Out of capacity')) {
                log('  ❌ Out of capacity');
                setTimeout(retry, INTERVAL * 1000);
                log(' >> Trying again in ' + INTERVAL + 's...');
            } else if (
                text.includes('provisioning') ||
                text.includes('creating') ||
                text.includes('work request')
            ) {
                log('🎉 SUCCESS! Instance created!');
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
