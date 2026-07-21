/* ── Barra de navegação: muda visual ao rolar a página ── */
  const nav = document.getElementById('nav');
  const navLogo = document.getElementById('nav-logo');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('solid', scrolled);
    navLogo.style.height = scrolled ? '52px' : '72px';
  });

  /* ── Menu hamburguer: abre e fecha o menu no mobile ── */
  document.getElementById('ham').addEventListener('click', () => {
    document.getElementById('mob').classList.toggle('open');
  });
  document.querySelectorAll('#mob a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('mob').classList.remove('open'))
  );

  /* ── Carrossel do banner principal ── */
  const slides   = document.querySelectorAll('#slides-wrap .slide');
  const dotsEl   = document.getElementById('dots');
  let   current  = 0;
  let   autoTimer;

  /* cria os pontos de navegação conforme o número de slides */
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', () => { goTo(i); startAuto(); });
    dotsEl.appendChild(d);
  });

  function goTo(idx) {
    /* remove o destaque do slide e do ponto ativos */
    slides[current].classList.remove('active');
    dotsEl.children[current].classList.remove('active');

    /* avança o índice de forma circular: volta ao início quando chega no fim */
    current = (idx + slides.length) % slides.length;

    /* ativa o novo slide e ponto sem alterar o position inline */
    slides[current].classList.add('active');
    dotsEl.children[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5000);
  }

  document.getElementById('carr-next').addEventListener('click', () => { next(); startAuto(); });
  document.getElementById('carr-prev').addEventListener('click', () => { prev(); startAuto(); });

  /* suporte a toque: detecta deslize para navegar os slides no mobile */
  let touchX = 0;
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive:true });
  carousel.addEventListener('touchend', e => {
    const dx = touchX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { dx > 0 ? next() : prev(); startAuto(); }
  }, { passive:true });

  startAuto();

  /* ── Slider de fotos da seção Nossa História ── */
  const hSlides  = document.querySelectorAll('#historia-slides .slide');
  const hDotsEl  = document.getElementById('historia-dots');
  let   hCurrent = 0;
  let   hTimer;

  hSlides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Foto ' + (i + 1));
    d.addEventListener('click', () => { hGoTo(i); hStartAuto(); });
    hDotsEl.appendChild(d);
  });

  function hGoTo(idx) {
    hSlides[hCurrent].classList.remove('active');
    hDotsEl.children[hCurrent].classList.remove('active');
    hCurrent = (idx + hSlides.length) % hSlides.length;
    hSlides[hCurrent].classList.add('active');
    hDotsEl.children[hCurrent].classList.add('active');
  }

  function hStartAuto() {
    clearInterval(hTimer);
    hTimer = setInterval(() => hGoTo(hCurrent + 1), 5000);
  }

  document.getElementById('historia-next').addEventListener('click', () => { hGoTo(hCurrent + 1); hStartAuto(); });
  document.getElementById('historia-prev').addEventListener('click', () => { hGoTo(hCurrent - 1); hStartAuto(); });

  hStartAuto();

  /* ── Painel de informação nutricional: abre e fecha ao clicar ── */
  document.querySelectorAll('.nutr-open-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.pcard').classList.add('nutr-open');
    });
  });
  document.querySelectorAll('.nutr-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.pcard').classList.remove('nutr-open');
    });
  });

  /* ── Animação de entrada: exibe elementos ao entrar na área visível ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold:.1, rootMargin:'0px 0px -36px 0px' });

  document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => io.observe(el));

  /* ── Rolagem suave ao clicar em links âncora ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 74, behavior:'smooth' });
    });
  });
