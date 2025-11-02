// === Hamburger meni + overlay ===
(function(){
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  // Napravi overlay dinamički (ako ne postoji u HTML-u)
  let overlay = document.querySelector('.nav-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const html = document.documentElement;
  const body = document.body;

  function openNav(){
    nav.classList.add('show');
    overlay.classList.add('show');
    btn.setAttribute('aria-expanded','true');
    html.classList.add('no-scroll');
    body.classList.add('no-scroll');
  }
  function closeNav(){
    nav.classList.remove('show');
    overlay.classList.remove('show');
    btn.setAttribute('aria-expanded','false');
    html.classList.remove('no-scroll');
    body.classList.remove('no-scroll');
  }

  if(btn && nav){
    btn.addEventListener('click', (e)=>{
      e.preventDefault(); // ✅ Sprečava skok na vrh stranice
      const isOpen = nav.classList.contains('show');
      isOpen ? closeNav() : openNav();
    });
  }

  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeNav(); });
  nav.addEventListener('click', (e)=>{ if(e.target.matches('a')) closeNav(); });
})();

// === Brže reveal uklizavanje ===
(function(){
  const els = Array.from(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  els.forEach(el=>io.observe(el));
})();
