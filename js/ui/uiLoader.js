async function loadUIpartials() {
    const partials = [
        { url: 'ui/settings-panel.html',      targetId: 'settings-panel' },
        { url: 'ui/farming-bonuses-view.html', targetId: 'view-farming' },
        { url: 'ui/landrank-optimizer.html',   targetId: 'view-landrank' }
    ];

    await Promise.all(partials.map(async ({ url, targetId }) => {
        const response = await fetch(url);
        const html = await response.text();
        const container = document.getElementById(targetId);
        if (container) {
            container.innerHTML = html;
        }
    }));

    // Load nested partials (injected into containers populated above)
    const nestedPartials = [
        { url: 'ui/other-bonuses.html',   targetId: 'other-bonuses-panel' },
        { url: 'ui/state-inspector.html', targetId: 'state-inspector-panel' }
    ];

    await Promise.all(nestedPartials.map(async ({ url, targetId }) => {
        const response = await fetch(url);
        const html = await response.text();
        const container = document.getElementById(targetId);
        if (container) {
            container.innerHTML = html;
        }
    }));

    if (typeof window.initAfterUI === 'function') {
        window.initAfterUI();
    }

    if (typeof initNavigation === 'function') {
        initNavigation();
    }
}
