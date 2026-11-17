
(function(){
  const RX = {
    '#shw': null
  };
  const cfg = window.SHW_CFG || {};
  const el = document.getElementById('shw');
  const bubble = document.getElementById('shw-bubble');
  const msg = document.getElementById('shw-msg');
  const opts = document.getElementById('shw-opts');
  let opened = false;

  function show(){ el.classList.add('open'); opened = true; bubble.style.display='none'; }
  function hide(){ el.classList.remove('open'); bubble.style.display='block'; }

  function render(step){
    const s = cfg.steps[step];
    msg.innerHTML = s.msg;
    opts.innerHTML = '';
    s.opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'opt'; b.type='button'; b.innerHTML = o.t;
      b.onclick = () => {
        if (o.href){ window.location.href = o.href; return; }
        if (o.step !== undefined) render(o.step);
        else if (o.msg) { msg.innerHTML = o.msg; opts.innerHTML=''; }
      };
      opts.appendChild(b);
    });
  }

  bubble.addEventListener('click', () => { if(!opened){ render('start'); } show(); });
  el.querySelector('[data-close]').addEventListener('click', hide);

  // page-aware auto open after 4.5 seconds
  if (cfg.auto !== false){
    const t = setTimeout(function(){
      if (opened) return;
      if (sessionStorage.getItem('shw_seen')) return;
      sessionStorage.setItem('shw_seen','1');
      render('start'); show();
    }, 4500);
  }
})();
