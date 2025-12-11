(function () {
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    if (stored === 'dark' || (!stored && prefersDark)) {
      body.classList.add('dark-theme');
    }
  
    const syncLabel = () => {
      const isDark = body.classList.contains('dark-theme');
      toggleBtn.innerHTML = isDark
        ? '<i class="fa fa-sun me-2"></i><span>Light</span>'
        : '<i class="fa fa-moon me-2"></i><span>Dark</span>';
    };
  
    syncLabel();
  
    toggleBtn.addEventListener('click', () => {
      const nowDark = body.classList.toggle('dark-theme');
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
      syncLabel();
    });
  })();

(() => {
  if (typeof bootstrap !== 'undefined') {
    new bootstrap.ScrollSpy(document.body, {
      target: '#navbar',
      offset: 90,
    });
  }
})();