function initNavigation() {
    var settingsPanel = document.getElementById('settings-panel');
    var btnToggle = document.getElementById('btn-toggle-settings');
    var navBtns = document.querySelectorAll('.nav-view-btn');

    // Settings toggle
    if (btnToggle) {
        btnToggle.addEventListener('click', function () {
            var isHidden = settingsPanel.style.display === 'none';
            settingsPanel.style.display = isHidden ? '' : 'none';
            btnToggle.classList.toggle('nav-btn-active', isHidden);
            btnToggle.classList.toggle('nav-btn-inactive', !isHidden);
        });
    }

    // View switching
    navBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var viewId = btn.dataset.view;

            // Hide all views
            document.querySelectorAll('.view-content').forEach(function (v) {
                v.style.display = 'none';
            });

            // Show selected view
            var target = document.getElementById('view-' + viewId);
            if (target) target.style.display = '';

            // Update active button styles
            navBtns.forEach(function (b) {
                b.classList.remove('nav-btn-active');
                b.classList.add('nav-btn-inactive');
            });
            btn.classList.add('nav-btn-active');
            btn.classList.remove('nav-btn-inactive');

            // Re-render view-specific content
            if (viewId === 'farming') {
                if (typeof renderFarmingBonuses === 'function') renderFarmingBonuses();
                if (window.StateInspector && window.StateInspector.renderInspector) {
                    window.StateInspector.renderInspector();
                }
            }
        });
    });
}
