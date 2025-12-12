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
    document.body.removeAttribute('data-bs-spy');
    
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveLink = () => {
      const scrollPos = window.scrollY + 150; 
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
      
      if (window.scrollY < 200) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
          }
        });
      }
    };
    
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    updateActiveLink();
  }
})();