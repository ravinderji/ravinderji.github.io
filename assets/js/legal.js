// Privacy and terms pages: English / हिन्दी switch and an "On this page" list built from the headings.
// Without JavaScript both languages simply show one after the other.
(function () {
  const sections = [...document.querySelectorAll('.legal > section[lang]')];
  const toc = document.querySelector('.toc ol');
  const tocMobile = document.querySelector('.toc-mobile ol');
  const switches = [...document.querySelectorAll('.lang-switch a')];
  if (!sections.length) return;
  document.documentElement.classList.add('js-lang');

  sections.forEach(s => s.querySelectorAll('h2').forEach((h, i) => { if (!h.id) h.id = s.id + '-' + (i + 1); }));

  let observer;
  function show(id) {
    const current = sections.find(s => s.id === id) || sections[0];
    sections.forEach(s => { s.hidden = s !== current; });
    switches.forEach(a => a.setAttribute('aria-current', String(a.hash === '#' + current.id)));
    const items = [...current.querySelectorAll('h2')].map(h => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join('');
    if (toc) toc.innerHTML = items;
    if (tocMobile) tocMobile.innerHTML = items;
    const title = document.querySelector('[data-title-hi]');
    if (title) {
      if (!title.dataset.titleEn) title.dataset.titleEn = title.textContent;
      title.textContent = current.lang === 'hi' ? title.dataset.titleHi : title.dataset.titleEn;
    }
    const label = current.lang === 'hi' ? 'इस पेज पर' : 'On this page';
    document.querySelectorAll('.toc p, .toc-mobile summary').forEach(el => { el.textContent = label; });

    // Highlight the heading being read
    if (observer) observer.disconnect();
    if (toc && 'IntersectionObserver' in window) {
      const links = new Map([...toc.querySelectorAll('a')].map(a => [a.hash.slice(1), a]));
      observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            links.forEach(a => a.classList.remove('on'));
            const a = links.get(e.target.id);
            if (a) a.classList.add('on');
          }
        });
      }, { rootMargin: '0px 0px -70% 0px' });
      current.querySelectorAll('h2').forEach(h => observer.observe(h));
    }
  }

  function fromHash() {
    const id = location.hash.slice(1);
    const owner = sections.find(s => s.id === id || (id && s.querySelector('#' + CSS.escape(id))));
    show(owner ? owner.id : sections[0].id);
  }

  switches.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    history.replaceState(null, '', a.hash === '#' + sections[0].id ? location.pathname : a.hash);
    show(a.hash.slice(1));
    window.scrollTo({ top: 0 });
  }));
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
